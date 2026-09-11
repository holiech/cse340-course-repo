import db from "./db.js";
const getAllProjects = async () => {
  const query = `
    SELECT
    P.project_id,
    P.title,
    P.description,
    P.location,
    P.project_date,
    O.name AS organization_name
    FROM project P
    JOIN organization O 
    ON P.organization_id = O.organization_id;
  `;


  const result = await db.query(query);
  return result.rows;};

export { getAllProjects };