import db from "./db.js";
const getAllProjects = async () => {
  const query = `
    SELECT
      P.project_id,
      P.organization_id,
      P.title,
      P.description,
      P.location,
      P.project_date,
      O.name AS organization_name
    FROM project P
    JOIN organization O
      ON P.organization_id = O.organization_id
    ORDER BY P.project_date;
  `;
  const result = await db.query(query);

  return result.rows;
};


const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date AS date
    FROM project
    WHERE organization_id = $1
    ORDER BY project_date;
  `;

  const queryParams = [organizationId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

////team work
const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      P.project_id,
      P.title,
      P.description,
      P.project_date AS date,
      P.location,
      P.organization_id,
      O.name AS organization_name
    FROM project P
    JOIN organization O
      ON P.organization_id = O.organization_id
    WHERE P.project_date >= CURRENT_DATE
    ORDER BY P.project_date ASC
    LIMIT $1;
  `;

  const queryParams = [number_of_projects];

  const result = await db.query(query, queryParams);

  return result.rows;
};



const getProjectDetails = async (id) => {
  const query =`
  SELECT
  P.project_id,
  P.title,
  P.description,
  P.project_date AS date,
  P.location,
  P.organization_id,
   O.name AS organization_name
  FROM project P
  JOIN organization O
    ON P.organization_id = O.organization_id
    WHERE P.project_id = $1;
  `;

  const queryParams = [id];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
  
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects , getProjectDetails};