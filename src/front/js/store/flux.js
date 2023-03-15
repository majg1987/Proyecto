const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            user: {},
            registered: false,
            errorRegister: false,
        },
        actions: {
            // Control de errores
            errorRegister: () => {
                setStore({
                    errorRegister: false
                })
            },

            // User register
            register: async (user) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password
                    })
                };
                try {
                    const response = await fetch(
                        `${process.env.BACKEND_URL}/api/userRegister`,
                        options
                    );
                    if (response.status === 200) {
                        setStore({
                            registered: true
                        })
                    }

                    setStore({
                        registered: false
                    })

                } catch (error) {
                    console.log(`Error: ${error}`);
                    setStore({
                        errorRegister: true
                    })
                }
            }
        }
    };
};

export default getState;