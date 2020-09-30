import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { v1 as uuid } from 'uuid';
import { RiUploadCloudFill } from 'react-icons/ri';
import { VscFilePdf } from 'react-icons/vsc';
import { MdImage } from 'react-icons/md';
import { httpClient, getHeaders, contentTypes } from '../../api';

const inputId = uuid();
const baseUrl = '/services/file-storage';

const bounce = keyframes`
  from {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    transform: translate3d(0);
  }
  to {
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1;
  }
`;
const fileTypes = Object.freeze({
  PDF: 'PDF',
  IMAGE: 'IMAGE'
});

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function getAcceptedContentTypes(allowPDF, allowImage) {
  const contentTypes = [];
  if (allowPDF) contentTypes.push('application/pdf');
  if (allowImage) {
    const imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
    imageTypes.forEach((imageType) => {
      contentTypes.push(`image/${imageType}`);
    });
  }

  return contentTypes;
}

function FileUploader({
  className,
  folder,
  allowPDF = true,
  allowImage = true,
  onFileUploaded,
  onFileDeleted,
  onOpenFile
}) {
  const [requesting, setRequesting] = useState(false);
  const [type, setType] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);

  const [dragging, setDragging] = useState(false);

  function uploadFile(file, fileType) {
    setRequesting(true);

    const formData = new window.FormData();
    formData.set('folder', folder);
    formData.set('file', file);

    httpClient
      .post(baseUrl, formData, {
        headers: getHeaders(contentTypes.FORM_DATA)
      })
      .then(({ data }) => {
        setRequesting(false);

        console.log(fileType);
        setUploadResponse(data.data);
        onFileUploaded({ ...data.data, type: fileType });
      })
      .catch((error) => {
        setRequesting(false);
        console.log(error);
      });
  }

  function deleteFile() {
    setRequesting(true);

    httpClient
      .delete(baseUrl, { headers: getHeaders(), params: { remoteId: uploadResponse.remoteId } })
      .then(() => {
        setRequesting(false);
        setType('');
        onFileDeleted(uploadResponse.remoteId);
        setUploadResponse(null);
      })
      .catch((error) => {
        setRequesting(false);
        console.log(error);
      });
  }

  function processFiles(files = []) {
    if (files.length > 0) {
      const file = files[0];
      const acceptedContentTypes = getAcceptedContentTypes(allowPDF, allowImage);
      if (acceptedContentTypes.includes(file.type)) {
        const fileType = file.type.includes('pdf') ? fileTypes.PDF : fileTypes.IMAGE;
        setType(fileType);
        uploadFile(file, fileType);
      } else {
        window.alert(`Unautorized type ${file.type}`);
      }
    }
  }

  function cancelDefault(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  function handleDragEnter(evt) {
    cancelDefault(evt);
    setDragging(true);
  }

  function handleDragOver(evt) {
    cancelDefault(evt);
    setDragging(true);
  }

  function handleDragLeave(evt) {
    cancelDefault(evt);
    setDragging(false);
  }

  function handleDrop(evt) {
    cancelDefault(evt);
    setDragging(false);

    processFiles(evt.dataTransfer.files);
  }

  function handleChange(evt) {
    processFiles(evt.target.files);
  }

  function handleDelete(evt) {
    evt.preventDefault();
    deleteFile();
  }

  function handleOpenFile(evt) {
    evt.preventDefault();
    onOpenFile({ type, url: uploadResponse.url });
  }

  return (
    <div
      className={`${className} ${dragging ? 'dragging' : ''}`}
      onDragEnter={uploadResponse ? null : handleDragEnter}
      onDragOver={uploadResponse ? null : handleDragOver}
      onDragLeave={uploadResponse ? null : handleDragLeave}
      onDrop={uploadResponse ? null : handleDrop}
    >
      {uploadResponse ? (
        <div className='upload-response'>
          <FlexColumn className='content'>
            <FlexColumn>
              <a href='/' onClick={handleOpenFile}>
                {type === 'PDF' ? <VscFilePdf size={64} color='#a0aec0' /> : <MdImage size={64} color='#a0aec0' />}
              </a>
              <span>Cliquez pour voir</span>
            </FlexColumn>
            <a href='/' onClick={handleDelete}>
              Supprimer
            </a>
          </FlexColumn>
        </div>
      ) : (
        <>
          <FlexColumn className='info'>
            <RiUploadCloudFill size={64} color='#a0aec0' />
            <span>Glissez votre fichier ici ou cliquez dans la zone </span>
          </FlexColumn>

          <input
            type='file'
            id={inputId}
            accept={getAcceptedContentTypes(allowPDF, allowImage)}
            onChange={handleChange}
          />
          <label htmlFor={inputId} />
        </>
      )}

      {requesting && (
        <div className='loader'>
          <div>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

FileUploader.propTypes = {
  className: PropTypes.string,
  folder: PropTypes.oneOf(['assessments', 'assessment_results']),
  allowPDF: PropTypes.bool,
  allowImage: PropTypes.bool,
  onFileUploaded: PropTypes.func.isRequired,
  onFileDeleted: PropTypes.func.isRequired,
  onOpenFile: PropTypes.func.isRequired
};

export default styled(FileUploader)`
  padding: 2rem;
  border: 1px dashed #e2e8f0;
  border-radius: 5px;
  position: relative;
  min-height: 186px;
  display: flex;
  flex-direction: column;
  transition: all 200ms;

  &.dragging {
    box-shadow: 0 0 0 1px #3182ce;
    border: 1px solid #3182ce;
  }

  > div {
    &.info {
      color: #718096;
      flex: 1;
      justify-content: center;

      > span {
        display: inline-block;
        margin-top: 0.5rem;
      }
    }

    &.upload-response {
      z-index: 2;

      > .content {
        > div {
          color: #718096;
        }

        > a {
          color: #c53030;
          font-weight: 600;
          transition: all 200ms ease-in-out;
          cursor: pointer;
          margin-top: 0.5rem;

          :hover {
            color: #f56565;
            text-decoration: underline;
          }
        }
      }
    }

    &.loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.6);
      z-index: 2;
      animation: ${fadeIn} 500ms forwards;

      > div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;

        > div {
          display: flex;
          justify-content: center;
          align-items: center;

          > span {
            background: white;
            border-radius: 50%;
            margin: 5rem 0.5rem;
            animation: ${bounce} 0.6s infinite alternate;

            :nth-child(2) {
              animation-delay: 0.2s;
            }

            :nth-child(3) {
              animation-delay: 0.4s;
            }
          }
        }
      }
    }
  }

  > input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  > label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }
`;
