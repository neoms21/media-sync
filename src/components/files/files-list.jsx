import React from 'react';


const FilesList = ({files}) => (
    <div className="images">
        {files.map(f => {
            return <div className="well well-sm" key={f.file.name}>
                <span>    {f.file.name} </span>

                {f.percentCompleted === 100 ? <span className="glyphicon glyphicon-ok indicator"></span> :
                    <span className="indicator-pending">{f.percentCompleted}%</span>}
            </div>
        })}
    </div>
);


export default FilesList;