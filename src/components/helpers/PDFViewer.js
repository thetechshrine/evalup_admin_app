/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

const layout = (isSidebarOpened, container, main, toolbar, sidebar): React.ReactElement => {
  return (
    <div
      {...container.attrs}
      style={Object.assign(
        {},
        {
          border: '1px solid rgba(0, 0, 0, .3)',
          height: '100%',
          overflow: 'hidden',
          width: '100%'
        },
        container.attrs.style
      )}
    >
      {container.children}
      <div
        {...main.attrs}
        style={Object.assign(
          {},
          {
            height: '100%',
            overflow: 'scroll'
          },
          main.attrs.style
        )}
      >
        {main.children}
      </div>
    </div>
  );
};

function PDFViewer({ className, url }) {
  return (
    <div className={className}>
      <div>
        {url && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js'>
            <Viewer fileUrl={url} layout={layout} />
          </Worker>
        )}
      </div>
    </div>
  );
}

PDFViewer.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string
};

export default styled(PDFViewer)`
  position: relative;

  > div {
    :first-child {
      display: flex;
      justify-content: center;

      > div {
        border: none !important;
        border-radius: 5px;
        background: var(--color-white);

        > div {
          overflow-x: hidden !important;
          overflow-y: auto !important;
        }
      }

      .viewer-page-layer {
        box-shadow: none;
      }
    }
  }
`;
