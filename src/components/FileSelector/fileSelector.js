import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {filesSelected, folderNameChanged, postFile, uploadComplete} from "../../logic/actions";
import './styles.css'


class FileSelector extends Component {
    componentWillReceiveProps = (nextState) => {
        if (nextState.files.length < 1 || nextState.folder === '')
            return;

        if (nextState.files.map(f =>
                (f.uploadComplete)).every(function (x) {
                return x && true;
            })) {
            this.props.uploadComplete({
                folder: this.props.folder, files: nextState.files.map(f => {
                    return f.name
                })
            })
        }
    };

    render() {
        const {files, onFilesSelected, postFile, folder, folderNameChanged, error} = this.props;

        return (<div>
            <div>
                {error}
            </div>
            <div className="upload">

                <label htmlFor="file-upload" className="custom-file-upload alert alert-info">
                    <i className="fa fa-cloud-upload"></i> Select File(s) to upload
                </label>

                <button className={`btn btn-success ${files.length === 0 ? 'disabled' : ''}`} onClick={() => {
                    files.forEach(f => {
                        postFile(f);
                    });
                }}>Upload
                </button>
            </div>
            <div className="">
                <label>Folder Name</label>
                <input value={folder} onChange={(e) => {
                    folderNameChanged(e.target.value);
                }}/>
            </div>
            <input id="file-upload" accept="image/*,video/mp4,video/x-m4v,video/*" type="file" onChange={(e) => {
                let selectedFiles = e.target.files;
                let filesArr = [];
                const filesLength = selectedFiles.length;
                for (let i = 0; i < filesLength; i++) {
                    filesArr.push(selectedFiles[i]);
                }
                onFilesSelected(filesArr);
            }} multiple/>
            {files.map(f => {
                return <div className="well well-sm" key={f.file.name}>
                    {/*<img alt={f.file.name} className="img-preview" src={URL.createObjectURL(f.file)}/>*/}
                    <span>    {f.file.name} </span>

                    {f.percentCompleted === 100 ? <span className="glyphicon glyphicon-ok indicator"></span> :
                        <span className="indicator">{f.percentCompleted}%</span>}
                </div>
            })}
        </div>);
    }
}


FileSelector.propTypes = {
    onFilesSelected: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {files: state.files.files, folder: state.files.folder, error: state.files.error};
};

const mapDispatchToProps = dispatch => ({
    onFilesSelected: selectedFiles => dispatch(filesSelected(selectedFiles)),
    folderNameChanged: value => dispatch(folderNameChanged(value)),
    postFile: selectedFiles => dispatch(postFile(selectedFiles)),
    uploadComplete: payload => dispatch(uploadComplete(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector);
