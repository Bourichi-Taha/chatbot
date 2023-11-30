import React, { useEffect, useState } from 'react'
import "../../assets/css/settings.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, TextField } from '@mui/material';
import img from "../../assets/images/user.png";
import { useFetchImageQuery, useFetchUserQuery, useGenerateImageMutation, useUpdateUserMutation } from '../../features/settings/SettingsApiSlice';
import CircularProgress from '@mui/material/CircularProgress';
const AccountSidebar = () => {
    const { data, isLoading, isSuccess } = useFetchUserQuery();
    const { data: imageData, isLoading: isImageLoading, isSuccess: isImageSuccess } = useFetchImageQuery({},{
        pollingInterval: 4000,
    });
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [withAi, setWithAi] = useState(false);
    const [image, setImage] = useState("");
    const [updateUser] = useUpdateUserMutation();
    const [generateImage] = useGenerateImageMutation();
    useEffect(() => {
        if (isSuccess) {
            setEmail(data.email);
            setFirstname(data.first_name);
            setLastname(data.last_name);
            setUsername(data.username);
        }
    }, [data, isSuccess]);
    useEffect(() => {
        if (isImageSuccess && !imageData.image_is_generating) {
            setImage(imageData.image_url);
            setWithAi(false)
        }
        // console.log(isImageSuccess)
    }, [isImageSuccess,imageData?.image_is_generating]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ data: { username, first_name: firstname, last_name: lastname, email } })
        } catch (error) {
            console.log("error:", error)
        }
    }
    const clickGenerator = async (e) => {
        if (description !== "") {
            await generateImage({ data: { description } });
        }
    }
    let content;
    if (isLoading) {
        content = (
            <div className="settings-right">
                <div className="settings-right-header">
                    <h3 className="settings-right-header-title"><AccountCircleIcon className='settings-right-header-title-icon' /> Account Preferences</h3>
                </div>
                <div className="settings-right-body">
                    <p className="input-label-settings-right-body-row">Profile picture :</p>
                    <div className="settings-right-body-row">
                        <div className="settings-right-body-row-half">
                            <img src={img} alt="" />
                        </div>
                        <div className="settings-right-body-row-half">
                            <Button disabled fullWidth variant="contained" className='input-settings-right-body-row' type='button'>Generate with AI</Button>
                            <Button disabled fullWidth variant="contained" className='input-settings-right-body-row' type='button'>Upload from device</Button>
                        </div>
                    </div>
                    <p className="input-label-settings-right-body-row">User information :</p>
                    <div className="settings-right-body-row" >
                        <TextField
                            className='settings-right-body-row-item'
                            label="Firstname"
                            type="text"
                            required
                        />
                        <TextField
                            className='settings-right-body-row-item'
                            label="Lastname"
                            type="text"
                            required
                        />
                    </div>
                    <div className="settings-right-body-row" >
                        <TextField
                            className='settings-right-body-row-item'
                            label="Username"
                            type="text"
                            required
                        />
                        <TextField
                            className='settings-right-body-row-item'
                            label="Email"
                            type="email"
                            required

                        />
                    </div>
                    <Button fullWidth disabled variant="contained" className='input-settings-right-body-row'>Update Temperature</Button>
                    <Button fullWidth disabled variant="contained" className='input-settings-right-body-row'>Reset Default</Button>
                </div>
            </div>
        )
    } else {
        content = (
            <div className="settings-right">
                <div className="settings-right-header">
                    <h3 className="settings-right-header-title"><AccountCircleIcon className='settings-right-header-title-icon' /> Account Preferences</h3>
                </div>
                <form className="settings-right-body" onSubmit={submitHandler}>
                    <p className="input-label-settings-right-body-row">Profile picture :</p>
                    <div className="settings-right-body-row">
                        <div className="settings-right-body-row-half">
                            <img src={(image!==null && image !== "") ? image : img} alt="" />
                        </div>
                        <div className="settings-right-body-row-half">
                            <Button fullWidth variant="contained" className='input-settings-right-body-row' onClick={(e) => { setWithAi(prev => !prev) }}>{withAi ? "Cancel generation" : "Generate with AI"}</Button>
                            <Button fullWidth variant="contained" className='input-settings-right-body-row'>Upload from device</Button>
                        </div>
                    </div>
                    <div className={withAi ? "settings-right-body-row" : "settings-right-body-row closed"} >
                        <TextField
                            className='settings-right-body-row-item-textField'
                            label="Describe your desired image"
                            type="text"
                            required
                            multiline
                            maxRows={4}
                            minRows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Button fullWidth variant="contained" className={withAi ? 'input-settings-right-body-row' : 'input-settings-right-body-row closed'} onClick={clickGenerator} >{imageData?.image_is_generating ? <CircularProgress sx={{color:"white"}}/> :"Generate"}</Button>
                    <p className="input-label-settings-right-body-row">User information :</p>
                    <div className="settings-right-body-row" >
                        <TextField
                            className='settings-right-body-row-item'
                            label="Firstname"
                            type="text"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <TextField
                            className='settings-right-body-row-item'
                            label="Lastname"
                            type="text"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="settings-right-body-row" >
                        <TextField
                            className='settings-right-body-row-item'
                            label="Username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            className='settings-right-body-row-item'
                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button fullWidth variant="contained" className='input-settings-right-body-row' type='submit'>Update Temperature</Button>
                </form>
            </div>
        )
    }
    return content;
}

export default AccountSidebar