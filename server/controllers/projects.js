require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");
const Project = require("../models/project");
const { PROJECTS_PER_BATCH } = require("../utils/constants.js");
const { cloudinary } = require("../utils/cloudinary");
var isAfter = require("date-fns/isAfter");

const updateProjectStatus = async (project) => {
  if (project.status === "completed" || project.status === "failed")
    return project;
  // is today past the deadline? update the status if so
  if (isAfter(new Date(), project.deadline)) {
    if (project.amount_donated < project.target_goal) {
      project.status = "failed";
    }
  }
  if (project.amount_donated >= project.target_goal) {
    project.status = "completed";
  }

  let updatedProject = await project.save();
  return updatedProject;
};

// retrieve projects list (not user specific)
exports.get_all_projects = async (req, res) => {
  console.log("retrieving all projects");
  try {
    const projects = await Project.find()
      .sort({ amount_donated: -1 })
      // .limit(PROJECTS_PER_BATCH /* * (retrievalCount + 1)*/)
      .populate("creator donors");
    if (!projects) throw Error("Unable to retrieve projects.");

    for (let project of projects) {
      if (project.status === "completed" || project.status === "failed")
        continue;
      // is today past the deadline? update the status if so
      if (isAfter(new Date(), project.deadline)) {
        if (project.amount_donated < project.target_goal) {
          project.status = "failed";
          await project.save();
        }
      }
      if (project.amount_donated >= project.target_goal) {
        project.status = "completed";
        await project.save();
      }
    }
    /*
    // process the projects so it updates the statuses based on deadline
    const processedProjects = await projects.map((project) =>
      updateProjectStatus(project)
    );
    */
    res.status(200).json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// retrieve all projects that belong only to a specific user
//this is where the error is
exports.get_all_user_projects = async (req, res) => {
  console.log("retrieving user projects list");
  try {
    // declare empty object to be used for categorizing
    let userProjects = {};

    // retrieve the user object, and select only projectsOwned and projectsSupported
    const user = await User.findById(req.params.id)
      .select("projectsOwned projectsSupported")
      .populate("projectsOwned projectsSupported");
    if (!user) throw Error("User does not exist.");
    console.log(user);

    // categorize them first for easy retrieval
    let { projectsOwned, projectsSupported } = user;
    console.log(projectsOwned);

    for (let project of projectsOwned) {
      if (project.status === "completed" || project.status === "failed")
        continue;
      // is today past the deadline? update the status if so
      if (isAfter(new Date(), project.deadline)) {
        if (project.amount_donated < project.target_goal) {
          project.status = "failed";
          await project.save();
        }
      }
      if (project.amount_donated >= project.target_goal) {
        project.status = "completed";
        await project.save();
      }
    }

    for (let project of projectsSupported) {
      if (project.status === "completed" || project.status === "failed")
        continue;
      // is today past the deadline? update the status if so
      if (isAfter(new Date(), project.deadline)) {
        if (project.amount_donated < project.target_goal) {
          project.status = "failed";
          await project.save();
        }
      }
      if (project.amount_donated >= project.target_goal) {
        project.status = "completed";
        await project.save();
      }
    }

    // const processedProjectsOwned = await projectsOwned.map((project) =>
    //   updateProjectStatus(project)
    // );
    // const processedProjectsSupported = await projectsSupported.map((project) =>
    //   updateProjectStatus(project)
    // );
    // console.log(processedProjectsOwned);
    // make sure the statuses are updated before sending them to frontend
    userProjects = {
      projectsOwned,
      projectsSupported,
    };
    res.status(200).json(userProjects);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

//action sends a GET method to that route, this controller function gets called
exports.get_project = async (req, res) => {
  console.log("retrieving a project");
  try {
    //mongoose query
    const project = await Project.findById(req.params.id).populate("creator");
    if (!project)
      throw Error(
        "Project does not exist."
      ); /*this is basically error handling, if it can't find it*/

    const processedProject = await updateProjectStatus(project);
    res.status(200).json(processedProject); /*if it exists, send success*/
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ msg: e.message }); /*return error code, as well as message*/
  }
};

// have a user create a project
exports.create_project = async (req, res) => {
  const { name, target_goal, deadline, description, creatorId } = req.body;
  let errors = [];
  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the project." });
  }
  if (!target_goal) {
    errors.push({ msg: "Please provide a target_goal for the project." });
  }
  if (!deadline) {
    errors.push({ msg: "Please provide a deadline for the project." });
  }
  // Check if user is logged in
  if (!creatorId) {
    errors.push({ msg: "Unauthorized user, please log in." });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const newProject = new Project({
        name,
        target_goal,
        deadline,
        description,
        creator: creatorId,
        amount_donated: 0,
        donors: [],
        status: "active",
      });
      const savedProject = await newProject.save();
      if (!savedProject) throw Error("Failed to create the project.");

      // update the owner of the project to add the newly created project to their list of projects
      const creator = await User.findById(creatorId);
      creator.projectsOwned = [...creator.projectsOwned, savedProject];
      const updatedCreator = await creator.save();
      if (!updatedCreator) throw Error("Failed to failed to update the user.");

      res.status(200).json({
        id: savedProject._id.toString(),
        name,
        description,
        target_goal,
        amount_donated: 0,
        creator,
        donors: [],
        created: savedProject.created,
        status: "active",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.edit_project = async (req, res) => {
  const { name, description, creatorId, projectId } = req.body;
  let errors = [];
  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the project." });
  }

  // Check if user is logged in
  if (!creatorId) {
    errors.push({ msg: "Unauthorized user, please log in." });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the project using projectId
      const project = await Project.findById(projectId);
      if (!project) throw Error("Unable to find that project.");
      // check if the user is the owner of the project
      if (creatorId == project.creator.toString()) authorized = true;
      // only allow the project to be edited if user is authorized
      if (authorized) {
        project.name = name;
        project.description = description;
        project.status =
          project.amount_donated > project.target_goal ? "completed" : "active";
        // update project status in database
        const updatedProject = await project.save();
        if (!updatedProject) throw Error("Failed to update the project.");
        res.status(200).json(updatedProject);
      } else {
        throw Error("Unauthorized user. Unable to edit the project.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.cancel_project = async (req, res) => {
  const { projectId, userId } = req.body;
  let errors = [];

  if (!userId) {
    errors.push({
      msg: "Unauthorized user, ID not found.",
    });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the project using projectId
      const project = await Project.findById(projectId);
      if (!project) throw Error("Unable to find that project.");
      // check if the user is the owner of the project
      if (userId == project.creator.toString()) authorized = true;
      // only allow the project to be canceled if user is authorized
      if (authorized) {
        project.status = "canceled";
        // update project status in database
        await project.save();
        res.status(200).json(project);
      } else {
        throw Error("Unauthorized user. Unable to cancel the project.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.delete_project = async (req, res) => {
  const { projectId, userId } = req.body;
  let errors = [];

  // check if any of the following properties are empty
  if (!projectId) {
    errors.push({ msg: "Please provide an ID for the project." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user." });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      const project = await Project.findById(projectId);
      if (!project) throw Error("Unable to find that project.");
      // check if the user is the owner of the project
      if (userId == project.creator.toString()) authorized = true;
      // only allow the project to be canceled if user is authorized
      if (authorized) {
        // delete it from the database
        await project.remove();
        // return the projectId to use for removing it in the frontend
        res.status(200).json({ projectId });
      } else {
        throw Error("Unauthorized user. Unable to delete the project.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.upload_image = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const { userId } = req.body;
    const projectId = req.params.id;

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "resto-fund",
      public_id: `${projectId}-project-icon`,
      width: 600,
      aspect_ratio: "1.8",
      // crop: "limit",
    });

    const image_url = uploadedResponse.secure_url;
    const project = await Project.findById(projectId);
    project.image_url = image_url;
    const updatedProject = await project.save();
    if (!updatedProject) throw Error("Failed to update the project.");

    res.status(200).json(updatedProject);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
};
