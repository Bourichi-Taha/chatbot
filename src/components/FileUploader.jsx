import React, {  useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ef6a36',
    borderStyle: 'dashed',
    backgroundColor: 'white',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#ef6a36'
};

const acceptStyle = {
    borderColor: '#ef6a36'
};

const rejectStyle = {
    borderColor: 'red'
};
const FileUploader = ({setFile}) => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            'application/pdf': []
        }, maxFiles: 1
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    useEffect(()=>{
        setFile(acceptedFiles[0])
    },[acceptedFiles,setFile]);


    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input className='file-uploader-input-field' {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.pdf files will be accepted)</em>
            </div>
            <aside>
                {acceptedFiles.length !== 0 &&
                    <div className="cf-uploaded-file">

                        {acceptedFiles[0].path}
                    </div>
                }
            </aside>
        </section>
    );
}

export default FileUploader