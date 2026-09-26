
import db from "./db.js";
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM category
        ORDER BY category_id;
        `;
    const result = await db.query(query);
    return result.rows;
};



// get category by id
const getCategoryDetails = async (categoryId) => {
    const query = `
    SELECT
    category_id,
    name
    FROM category
    WHERE category_id = $1;
    
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
};


//get categories for certain  sevice pro
const  getCategoriesByProjectId = async (projectId) => {
    const query = `

    SELECT
    C.category_id,
    C.name
    FROM category C
    JOIN project_category PC
    ON C.category_id = PC.category_id
    WHERE PC.project_id = $1
    ORDER BY C.name;
    `;

    const queryparams = [projectId];
    const result = await db.query(query, queryparams);
    return result.rows;//.length > 0 ? result.rows[0] : null;

};

//get all services for project
const getProjectsByCategoryId = async (categoryId) =>{
    const query =`
    SELECT
    P.project_id,
    P.title
    FROM project P
    JOIN project_category PC
    ON P.project_id = PC.project_id
    WHERE PC.category_id = $1
    ORDER BY P.project_date;
    
    
    `;

    const queryparams = [categoryId];
    const result = await db.query(query, queryparams);
    return result.rows;
}
// now 


const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};



//9/26 now

const createCategory = async (name) => {
    const query = `
    
    INSERT INTO category (name)
    VALUES ($1)
    RETURNING category_id;
    
    `;

    const queryParams = [name]
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Category not found");
    }

    return result.rows[0].category_id;
};



const updateCategory = async (categoryId, name) => {
    const query = `
    UPDATE category
    SET name = $1
    WHERE category_id =$2
    RETURNING category_id;
    
    `;


    const queryParams = [name, categoryId];
    const result =  await db.query(query, queryParams);

     if (result.rows.length === 0) {
        throw new Error("Category not found");
    }

    return result.rows[0].category_id;

};


export { updateCategoryAssignments, createCategory, updateCategory };

export {
        getAllCategories,
        getCategoryDetails,
        getCategoriesByProjectId,
        getProjectsByCategoryId
};



