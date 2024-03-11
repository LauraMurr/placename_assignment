export const aboutController = {
    index: {
      auth: false, // allow public access
      handler: function (request, h) {
        const viewData = {
          title: "About West Wicklow Walks",
        };
        return h.view("about-view", viewData);
      },
    },
  };
  