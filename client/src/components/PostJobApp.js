import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../css/PostJobApp.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class PostJobApp extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div className="app-postjob">
        <div className="postjob-img">
          <img src="/images/bg-2.jpeg" alt="" />
        </div>
        <form className="postjob-form">
          <h1>Compose a Job</h1>
          <div className="input-job">
            <span className="details">Job Title</span>
            <input type="text" name="job-title" placeholder="Enter job title" />
          </div>
          <div className="input-job">
            <span className="details">Job Description</span>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              placeholder="Enter Job Description"
            />
            <textarea
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            ></textarea>
          </div>
          <div className="input-job">
            <span className="details">Contact Details</span>
            <input type="tel" name="cd-phoneNumber" placeholder="Enter Phone Number" />
          </div>
          <div className="input-job">
            <span className="details">Job Location</span>
            <input type="text" name="job-location" placeholder="Enter Job Location" />
          </div>
          <div className="input-job">
            <span className="details">Job Pay</span>
            <input type="number" name="job-pay" placeholder="Enter Job Pay" />
          </div>
          <button type="submit" className="post-button">Post the job</button>
        </form>
      </div>
    );
  }
}
