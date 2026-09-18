

const showHomePage = async (req, res) =>{
    const title = 'home';
    res.render('home', {title});
};

export {showHomePage};