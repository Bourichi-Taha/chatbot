import React, { useEffect, useState } from 'react'
import "../../assets/css/settings.css";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { Button, MenuItem, Select, Slider } from '@mui/material';
import { useFetchModelQuery, useUpdateModelMutation } from '../../features/settings/SettingsApiSlice';

const ModelConfiguration = () => {
    const {  data,isLoading,isSuccess } = useFetchModelQuery();
    const [updateModel] = useUpdateModelMutation();
    function valuetext(value) {
        return `${value}`;
    }
    const [model,setModel] = useState("");
    const [llm_temperature,setLlm_temperature] = useState(0);
    useEffect(()=>{
        if (isSuccess) {
            setModel(data.model_name);
            setLlm_temperature(parseFloat(data.llm_temperature));
            console.log(parseFloat(data.llm_temperature))
        }
    },[isSuccess,data]);
    const UpdateHandler = (e) => {
        if (e.target.innerText.toLowerCase() === "Update Model".toLowerCase()) {
            updateModel({data:{model_name:model}});
        } else {
            updateModel({data:{llm_temperature}});
        }
    }
    let content;
    if (isLoading) {
        content = (
            <div className="settings-right">
                <div className="settings-right-header">
                    <h3 className="settings-right-header-title"><ModelTrainingIcon className='settings-right-header-title-icon' /> Model Configuration</h3>
                </div>
                <div className="settings-right-body">
                    <p className="input-label-settings-right-body-row">Loading</p>
                </div>
            </div>
        )
    } else {
        content = (
            <div className="settings-right">
                <div className="settings-right-header">
                    <h3 className="settings-right-header-title"><ModelTrainingIcon className='settings-right-header-title-icon' /> Model Configuration</h3>
                </div>
                <div className="settings-right-body">
                    <p className="input-label-settings-right-body-row">GBT Model :</p>
                    <div className="settings-right-body-row">
                        <Select
                            sx={{ flex: "1" }}
                            value={model}
                            // setModel(e.target.value)
                            onChange={(e)=>{setModel(e.target.value)}}
                        >
                            <MenuItem value={"gpt-4-1106-preview"}>GPT-4 Turbo</MenuItem>
                            <MenuItem value={"gpt-4-vision-preview"}>GPT-4 Turbo with vision</MenuItem>
                            <MenuItem value={"gpt-4"}>GPT-4</MenuItem>
                            <MenuItem value={"gpt-3.5-turbo-1106"}>GPT-3.5 Turbo</MenuItem>
                        </Select>
                        <Button variant="contained" className='input-settings-right-body-row'  onClick={UpdateHandler}>Update Model</Button>
                    </div>
                    <p className="input-label-settings-right-body-row">Model Temperature :</p>
                    <div className="settings-right-body-row" style={{ marginBottom: "20px" }}>
                        <Slider
                            sx={{ color: "#3464c4" }}
                            defaultValue={.7}
                            value={llm_temperature}
                            step={.1}
                            getAriaValueText={valuetext}
                            valueLabelDisplay='auto'
                            max={1}
                            min={0}
                            onChange={(e)=>{setLlm_temperature(e.target.value)}}
                        />
                        <div className="abs-items-settings-right-body-row">
                            <p>0.0 (Reserved)</p>
                            <p>(Creative) 1.0</p>
                        </div>
                    </div>
                    <Button fullWidth variant="contained" className='input-settings-right-body-row' onClick={UpdateHandler}>Update Temperature</Button>
                    <Button fullWidth variant="contained" className='input-settings-right-body-row'>Reset Default</Button>
                </div>
            </div>
        )
    }
    return content;
}

export default ModelConfiguration