import express from 'express';

import { showHomePage } from './controllers/index.js';
//import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage,showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm  } from './controllers/projects.js';


import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm,categoryValidation, showNewCategoryForm, processNewCategoryForm,showEditCategoriesForm,processEditCategoryForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

import { showOrganizationDetailsPage, showNewOrganizationForm, showOrganizationsPage, processNewOrganizationForm,
    organizationValidation, showEditOrganizationForm, processEditOrganizationForm
 } from './controllers/organizations.js';
import { validationResult } from 'express-validator';

import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm,processLogout, requireLogin, showDashboard, requireRole, showUserPage} from './controllers/users.js';

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


router.get('/new-organization',requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// New organization form router.get('/organizations/new', showNewOrganizationForm);



router.get(
'/edit-organization/:id',
requireRole('admin'),
showEditOrganizationForm
);
router.post(
    '/edit-organization/:id',
     requireRole('admin'),
    
    organizationValidation,
    processEditOrganizationForm);

//get new project
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);


router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
//router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'),projectValidation, processEditProjectForm);



router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoriesForm);
router.post('/edit-category/:id',requireRole('admin'), categoryValidation, processEditCategoryForm);
// error-handling routes


router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);



// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);


router.get('/dashboard', requireLogin, showDashboard)
router.get('/users', requireLogin, requireRole('admin'), showUserPage)

router.get('/test-error', testErrorPage);

export default router; 