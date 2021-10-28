export default {
    logIn: (user) => {
      return fetch("/user/logIn", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { isAuthenticated: false, user: { username: "", role: "" } };
      });
    },
  
    logout: () => {
      return fetch("/user/logout")
        .then((res) => res.json())
        .then((data) => data);
    },
  
    getusers: () => {
      return fetch("/user/").then((res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } else
          return {
            message: { messageBody: " UnAuthorised" },
            messageError: true,
          };
      });
    },
  
    isAuthenticated: () => {
      return fetch("/user/authenticated").then((res) => {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { isAuthenticated: false, user: { username: "", role: "" } };
      });
    },
  };