import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

export const WebcamMonitor = ({ onViolation }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let model = null;
    let intervalId = null;
    let stream = null;
    let isMounted = true;

    const setupCameraAndModel = async () => {
      try {
        // Initialize TensorFlow
        await tf.ready();

        // Load BlazeFace model
        model = await blazeface.load();

        // Access webcam
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 320,
            height: 240,
            facingMode: 'user'
          },
          audio: false
        });

        if (!isMounted || !videoRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        // Check face every 2.5 seconds
        intervalId = setInterval(async () => {
          if (
            !isMounted ||
            !videoRef.current ||
            videoRef.current.readyState !== 4 ||
            !model
          ) {
            return;
          }

          try {
            const predictions = await model.estimateFaces(
              videoRef.current,
              false
            );

            if (predictions.length === 0) {
              onViolation('NO_FACE');
            } else if (predictions.length > 1) {
              onViolation('MULTIPLE_FACES');
            }
          } catch (error) {
            console.error('Face detection error:', error);
          }
        }, 2500);
      } catch (error) {
        console.error('Camera/Model setup error:', error);
      }
    };

    setupCameraAndModel();

    // Cleanup
    return () => {
      isMounted = false;

      if (intervalId) {
        clearInterval(intervalId);
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [onViolation]);

  return (
    <div className="webcam-monitor">
      <video
        ref={videoRef}
        width="320"
        height="240"
        autoPlay
        muted
        playsInline
        style={{
          width: '320px',
          height: '240px',
          objectFit: 'cover',
          borderRadius: '10px',
          border: '2px solid #333',
          backgroundColor: '#000'
        }}
      />
    </div>
  );
};

export default WebcamMonitor;