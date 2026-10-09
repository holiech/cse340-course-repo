import {addVolunteer, removeVolunteer} from '../models/volunteers.js';

const processVolunteerRequest = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    try {
        await addVolunteer(userId, projectId);
        req.flash('success', 'You have successfully volunteered for the project.');
    }
    catch (error) {
        console.error('Error processing volunteer request:', error);
        req.flash('error', 'An error occurred while processing your request. Please try again.');
    }

    res.redirect(`/project/${projectId}`);
};
const processVolunteerRemoval = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    try {
        await removeVolunteer(userId, projectId);
        req.flash('success', 'You have successfully removed your volunteer commitment.');
    }
    catch (error) {
        console.error('Error processing volunteer removal:', error);
        req.flash('error', 'An error occurred while processing your request. Please try again.');
    }

    res.redirect(`/project/${projectId}`);
};

export { processVolunteerRequest, processVolunteerRemoval };