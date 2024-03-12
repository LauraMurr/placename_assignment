export const aboutController = {
    index: {
        auth: false, // allow public access
      handler: function (request, h) {
        const isAuthenticated = request.auth.isAuthenticated; 
        const viewData = {
          title: "About West Wicklow Walks",
          isAuthenticated: isAuthenticated, 
        };
        return h.view("about-view", viewData);
      },
    },
  };
  