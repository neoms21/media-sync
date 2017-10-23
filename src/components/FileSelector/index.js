import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {filesSelected} from "../../logic/actions";

// select files with options
export const FileSelector = ({files, onFilesSelected}) => {

    return (
        <div>
            <input accept="image/*" type="file" onChange={(e) => {
                let selectedFiles = e.target.files;
                let filesArr = [];
                const filesLength = selectedFiles.length;
                for (let i = 0; i < filesLength; i++) {
                    filesArr.push(selectedFiles[i]);
                }
                onFilesSelected(filesArr);
            }} multiple/>


            {files.map(f => {
                return <div key={f.name}>{f.name} </div>
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
    onFilesSelected: selectedFiles => dispatch(filesSelected(selectedFiles))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector);
