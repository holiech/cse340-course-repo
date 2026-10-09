import  db  from "./db.js";

const addVolunteer = async  (userId, projectId) =>  {

    const query = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING;
    
    
    `;

    const result  = await db.query(query, [userId,projectId])
    return result;

    
}


const removeVolunteer = async (userId, projectId) => {
    const query = `
    
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2;
    `;

    const result = await db.query(query,[userId,projectId]);
    return  result;

}

const isVolunteering = async (userId, projectId) => {
    const query = `
    SELECT 1 
    FROM volunteers
    WHERE user_id = $1 
    AND project_id = $2
    LIMIT 1;
    
    `;

    const result = await db.query(query, [userId, projectId]);
    return result.rows.length > 0;
};


const getVolunteeredProjects = async (userId) => {
    const query = `
    SELECT 
    p.project_id, 
    p.title,
    p.project_date AS date,
    p.description,
    p.location
    FROM project p
    JOIN volunteers v ON p.project_id = v.project_id
    WHERE v.user_id = $1
    ORDER BY p.project_date DESC;

    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    isVolunteering,
    getVolunteeredProjects
}