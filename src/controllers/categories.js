
import {getAllCategories, getCategoryDetails,getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments,createCategory, updateCategory }from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body,validationResult } from 'express-validator';  




const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title , categories});
};


const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', {title, category, projects})
}





//now

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};



// now 9/26/2026 
const categoryValidation = [
    body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({min: 3, max: 100}).withMessage('Category name must be between 3 and 100 characters')
];

const showNewCategoryForm = async (req, res) => {

    const title = 'Add New Category'
    res.render('new-category', {title});

};


    const processNewCategoryForm = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach((error) => req.flash('error', error.msg));
            return res.redirect(`/new-category`);  
            
        }



        const {name} = req.body;

        try {
            const categoryId = await createCategory(name);
            req.flash('success', 'Category Created successully');
            res.redirect(`/category/${categoryId}`);
        }

        catch (error) {
            console.error('Error Creating Category', error);
            req.flash('error', 'There was Error Creating Category');
            res.redirect('/new-category');
        }

    };



    const showEditCategoriesForm = async (req, res) => {

        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/categories');
        }
        const title  =  'Edit Category';

        res.render('edit-category', {title, category});
    };


    const processEditCategoryForm = async (req,res) =>{

        const categoryId = req.params.id;
        const errors = validationResult(req);

         if (!errors.isEmpty()) {
            errors.array().forEach((error) => req.flash('error', error.msg));
            return res.redirect(`/edit-category/${categoryId}`);  
        }

        const {name} = req.body;


         try {
            await updateCategory(categoryId, name);
            req.flash('success', 'Category Updated successully');
            res.redirect(`/category/${categoryId}`);
        }

        catch (error) {
            console.error('Error Updating Category', error);
            req.flash('error', 'There was Error Udating Category');
            res.redirect(`/edit-category/${categoryId}`);
        }


    };







        

        
    












export {showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm,categoryValidation, showNewCategoryForm, processNewCategoryForm,showEditCategoriesForm,processEditCategoryForm };