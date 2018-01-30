import React from 'react';
import './styles.scss'
import PropTypes from 'prop-types';

const FileSelector = (props) => {

    const {handleFileSelection, error} = props;

    return (<div>
            <div>
                {error}
            </div>
            <div className="upload">

                <label htmlFor="file-upload" className="custom-file-upload alert alert-info">
                    <i className="fa fa-cloud-upload"/> Select File(s) to upload
                </label>

            </div>

            <input id="file-upload" accept="image/*,video/mp4,video/x-m4v,video/*" type="file" onChange={(e) => {
                handleFileSelection(e.target.files, e.target.files.length);
            }} multiple/>

        </div>
    );
};


FileSelector.propTypes = {
    handleFileSelection: PropTypes.func.isRequired
};

export default FileSelector;
