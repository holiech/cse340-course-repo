import express from 'express';

import { showHomePage } from './controllers/index.js';
//import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage,showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';


import { showCategoriesPage, showCategoryDetailsPage
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage, showNewOrganizationForm, showOrganizationsPage, processNewOrganizationForm,
    organizationValidation, showEditOrganizationForm, processEditOrganizationForm
 } from './controllers/organizations.js';

// today update 08/21/26
const router = express.Router();

router.get('/test-route', (req, res) => {
  res.send('TEST ROUTE WORKS');
});


router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);


// Categories
router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);


router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// New organization form router.get('/organizations/new', showNewOrganizationForm);



router.get(
'/edit-organization/:id',
showEditOrganizationForm
);
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm);

//get new project
router.get('/new-project', showNewProjectForm);
router.post('/new-project',projectValidation, processNewProjectForm);



//router.get('/organization/:id', showOrganizationDetailsPage);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;