export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About West Wicklow Walks",
        };
        return h.view("about-view", viewData);
      },
    },
  };
  