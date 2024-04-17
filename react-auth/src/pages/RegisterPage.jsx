import { useState } from "react";
import { useAuth } from "../contexts/authentication";


function RegisterPage() {
    const [ username, setUsername ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ avatars, setAvatars ] = useState({}); // image

    const { register } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", username)
        formData.append("password", password)
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)

        for(let avatarKey in avatars){
            formData.append("avatar", avatars[avatarKey])
        }
        register(formData);
    }

    const handleFileChange = (event) => {
        const uniqueId = Date.now();
        setAvatars({
            ...avatars,
            [uniqueId]: event.target.files[0]
        });
        console.log([uniqueId])
    }

    const handleRemoveImage = (event, avatarKey) => {
        event.preventDefault();
        delete avatars[avatarKey];
        setAvatars({ ...avatars });
    }

    return (
        <div className="bg-slate-500 w-full h-screen">
            <div className="w-full mx-auto px-4 sm:px-12 md:px-28 lg:px-40">
            <form 
            className="" 
            onSubmit={handleSubmit}
            >
                <div className="text-white flex flex-col space-y-4 space-x-12 
                lg:space-x-28">
                    <h1 className="mx-12 lg:mx-28 mt-12 text-3xl">
                        Register Form
                    </h1>
                <div className="flex flex-col space-y-2">
                    <label className="text-2xl"
                    >
                        Username         
                    </label>
                    <div className="">
                       <input
                        type="text"
                        placeholder="Enter username here"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="text-stone-700 py-2 rounded-lg 
                         outline-transparent border-[2px] w-[88%] lg:w-4/5"
                        /> 
                    </div>           
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-2xl">
                        Password
                    </label>
                    <div>
                    <input 
                        type="text"
                        placeholder="Enter password here"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="text-stone-700 py-2 rounded-lg 
                        outline-transparent border-[2px] w-[88%] lg:w-4/5"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-2xl">
                        First Name
                    </label>
                    <div>
                    <input
                        type="text"
                        placeholder="Enter first name here"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        className="text-stone-700 py-2 rounded-lg 
                        outline-transparent border-[2px] w-[88%] lg:w-4/5"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-2xl">
                        Last Name
                    </label>
                    <div>
                    <input
                        type="text"
                        placeholder="Enter last name here"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        className="text-stone-700 py-2 rounded-lg 
                        outline-transparent border-[2px] w-[88%] lg:w-4/5"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                <label>
                        Avatar
                        <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        />
                    </label>
                    <div className="image-list-preview-container">
                        {Object.keys(avatars).map((avatarKey) => {
                            const file = avatars[avatarKey];
                            return (
                                <div key={avatarKey} className="w-[60%] h-[60%]">
                                    <img
                                    className="image-preview"
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    />
                                    <button
                                    className="image-remove-button"
                                    onClick={(e) => handleRemoveImage(e, avatarKey)}
                                    >
                                        x
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="">
                    <button
                    className="bg-green-400 rounded-md p-3"
                    type="submit"
                    >
                        Submit
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
    );
}

export default RegisterPage;
