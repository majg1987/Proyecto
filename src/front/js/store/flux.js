/* Importo las librerias para crear alert de registro erroneo */
import {
    ToastContainer,
    toast,
    Zoom
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            user: {},
            registered: false,
            error: false,
        },
        actions: {

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
                        getActions().notifySuccess('Registro realizado correctamente')
                        setStore({
                            registered: true
                        });
                    }

                    setStore({
                        registered: false
                    })

                } catch (error) {
                    console.log(`Error: ${error}`);
                    setStore({
                        error: true
                    })
                }
            },

            // Control de errores
            resetError: () => {
                setStore({
                    error: false
                })
            },

            // Alerts
            notifyError: (message) => {
                toast.error(message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            },

            notifySuccess: (message) => {
                toast.success(`🦄 ${message}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };
};

export default getState;