import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSelector from './FileSelector/fileSelector';
import Folder from './folder/folder';
import FilesList from "./files/files-list";
import { filesSelected, postFile, uploadComplete } from "../logic/actions";


class Home extends Component {

    componentWillReceiveProps = (nextState) => {
        console.log(nextState);
        if (nextState.files.length < 1 || this.state.folderName === '')
            return;

        if (nextState.files.map(f =>
                (f.uploadComplete)).every(function (x) {
                return x && true;
            })) {
            this.props.uploadComplete({
                folder: this.state.folderName, files: nextState.files.map(f => {
                    return f.name
                })
            })
        }
    };

    constructor(props) {
        super(props);
        this.state = {folderName: ''};
    }

    onTextChange = (e) => {
        this.setState({folderName: e.target.value});
    };

    onFilesSelection = (files, length) => {
        console.log(files, length);
        this.props.onFilesSelected(files, length);
    };

    handleUpload = () => {
        this.props.files.forEach(this.props.postFile);
    };

    render() {
        const {files} = this.props;
        return (
            <div>
                <div className="upload">
                    <FileSelector handleFileSelection={this.onFilesSelection} handleUpload={this.handleUpload}/>
                    <button className={`btn btn-success ${files.length === 0 ? 'disabled' : ''}`}
                            onClick={this.handleUpload}>
                        Upload
                    </button>
                </div>
                <Folder handleTextChange={this.onTextChange}/>

                <FilesList files={files}/>
            </div>
        )
    }
}


Home.defaultProps = {
    files: []
};

const mapStateToProps = state => {
    return {files: state.files.files, folder: state.files.folder, error: state.files.error};
};

const mapDispatchToProps = dispatch => ({
    onFilesSelected: (selectedFiles, length) => dispatch(filesSelected(selectedFiles, length)),
    postFile: selectedFiles => dispatch(postFile(selectedFiles)),
    uploadComplete: payload => dispatch(uploadComplete(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);