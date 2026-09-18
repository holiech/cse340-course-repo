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


export {
        getAllCategories,
        getCategoryDetails,
        getCategoriesByProjectId,
        getProjectsByCategoryId
};



