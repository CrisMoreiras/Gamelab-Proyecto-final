const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      videogames: [],
      consoles: [],
      user: [null],
      token: null,
    },
    actions: {
      
      // Use getActions to call a function within a function
      getVideogames: async () => {
        try {
          const url = process.env.BACKEND_URL + "/api/videogames/";
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              setStore({ videogames: data });
            });
        } catch (err) {
          console.error("Error loading list of videogames from backend", err);
        }
      },

      addVideogame: async (addVideogame) => {
        try {
          const url = process.env.BACKEND_URL + "/api/videogames/new";
          const options = {
            method: "POST",
            body: JSON.stringify(addVideogame),
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error to add a videogame from backend", error);
        }
      },

      deleteVideogame: async (videogame_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/videogames/${videogame_id}`;
          const options = {
            mode: "no-cors",
            method: "DELETE",
            origin: process.env.BACKEND_URL,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error deleting videogame from backend", error);
        }
      },
      editVideogame: async (id, videogame) => {
        let store = getStore();
        try {
          await fetch(`${process.env.BACKEND_URL}/editVideogames/${id}`, {
            method: "PUT",
            body: videogame
          })
        } catch (error) {
          console.log(error)
        }
      },

      getConsoles: async () => {
        try {
          const url = process.env.BACKEND_URL + "/api/consoles/";
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          const response = await fetch(url, options);
          const data = await response.json();
          setStore({ consoles: data });
        } catch (error) {
          console.error("Error loading list of consoles from backend", error);
        }
      },

      addConsole: async (newConsole) => {
        try {
          const url = process.env.BACKEND_URL + "/api/consoles";
          const options = {
            method: "POST",
            body: JSON.stringify(newConsole),
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error to add a console from backend", error);
        }
      },

      deleteConsole: async (console_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/consoles/${console_id}`;
          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error deleting console from backend", error);
        }
      },
      
      //USER
      signUp: async (form, navigate) => {
				const url = process.env.BACKEND_URL + "/api/signup";
				await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin":"*",
						"Access-Control-Allow-Methods":"*"
					},
					body: JSON.stringify({						
						"email": form.email,
                      	"password": form.password,
						"is_active": true
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok) {
						alert("user already exists");
						console.log(resp.status);
						return false;
						
					}
					await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					navigate('/login');														
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
      login: (form, navigate) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + "/api/login"
				fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
						'Access-Control-Allow-Origin':'*'
					},
					body: JSON.stringify({						
						"email": form.email,
                      	"password": form.password
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						alert("wrong username or password");
						return false;						
					}
					//console.log(resp.text()); // will try return the exact result as string
					const data = await resp.json();
					sessionStorage.setItem("token", data.token);
					setStore({token: data.token});
					
					console.log(store.token);
					navigate('/private');
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
      },
      authenticateUser: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = process.env.BACKEND_URL + "/api/private"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token,
						'Access-Control-Allow-Origin':'*'
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({user: data});
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
				if (token && token!= null && token!=undefined) setStore({token: token});
			},
			logout: (navigate) => {			
				setStore({user:null});
				sessionStorage.removeItem("token");
				setStore({token: null});
				navigate("/");
			}
		},
  

      //   getSingleConsole: async (consoleId) => {
      //     try {
      //         const url = `https://opulent-space-winner-r4g7prq6ww6r3wx64-3001.app.github.dev/api/consoles/${consoleId}`;
      //         const options = {
      //             method: "GET",
      //             headers: { "Content-Type": "application/json" },
      //         };
      //         const response = await fetch(url, options);
      //         const data = await response.json();

      //         setStore({ singleConsole: data });
      //     } catch (error) {
      //         console.error("Error loading single console from backend", error);
      //     }
      // },



      // exampleFunction: () => {
      // 	getActions().changeColor(0, "green");
      // },

      // getMessage: async () => {
      // 	try{
      // 		// fetching data from the backend
      // 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
      // 		const data = await resp.json()
      // 		setStore({ message: data.message })
      // 		// don't forget to return something, that is how the async resolves
      // 		return data;
      // 	}catch(error){
      // 		console.log("Error loading message from backend", error)
      // 	}
      // },
      // changeColor: (index, color) => {
      // 	//get the store
      // 	const store = getStore();

      // 	//we have to loop the entire demo array to look for the respective index
      // 	//and change its color
      // 	const demo = store.demo.map((elm, i) => {
      // 		if (i === index) elm.background = color;
      // 		return elm;
      // 	});

      // 	//reset the global store
      // 	setStore({ demo: demo });
      // }
    
  };
};

export default getState;
