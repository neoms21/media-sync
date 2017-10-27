import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {filesSelected, postFiles} from "../../logic/actions";
import './styles.css'

// select files with options
const FileSelector = ({files, onFilesSelected, postFiles}) => {

    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload alert alert-info">
                <i className="fa fa-cloud-upload"></i> Select File(s) to upload
            </label>

            <button onClick={() => {
                postFiles(files)
            }}>Upload
            </button>

            <input id="file-upload" accept="image/*" type="file" onChange={(e) => {
                let selectedFiles = e.target.files;
                let filesArr = [];
                const filesLength = selectedFiles.length;
                for (let i = 0; i < filesLength; i++) {
                    filesArr.push(selectedFiles[i]);
                }
                onFilesSelected(filesArr);
            }} multiple/>

            {files.map(f => {
                return <div className="well well-sm" key={f.name}>
                    <img className="img-preview" src={URL.createObjectURL(f)}/>
                    <span>    {f.name} </span>
                </div>
            })}
        </div>
    )
};


FileSelector.propTypes = {
    onFilesSelected: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {files: state.files.files};
};

const mapDispatchToProps = dispatch => ({
    onFilesSelected: selectedFiles => dispatch(filesSelected(selectedFiles)),
    postFiles: selectedFiles => dispatch(postFiles(selectedFiles))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector);
