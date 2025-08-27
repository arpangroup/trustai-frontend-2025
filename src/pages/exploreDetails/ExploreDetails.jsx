import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ExploreDetails.css'

import { CURRENCY_UNIT } from '../../constants/config';
import apiClient from '../../api/apiClient';
// import ConfirmModal from '../../components/modal/confirm/ConfirmModal';
// import WarningModal from '../../components/modal/warning/WarningModal';
import { API_ROUTES } from '../../api/apiRoutes';
import creator from '../../assets/seller2.png';
import SuccessIcon from '../../assets/icons/success.png';
import WarningIcon from '../../assets/icons/warming.png';
import AlertModal from '../../components/modal/success/AlertModal';
import { ERRORS } from '../../constants/errors';
import confetti from 'canvas-confetti';


const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`;

const ExploreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [modalOpen, setModalOpen] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showWarningModal, setShowWarningModal] = useState(false);

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: '', // 'success' or 'error'
    title: '',
    content: '',
    footerButtons: []
  });

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const resp = await apiClient.get(API_ROUTES.EXPLORE.STAKE_DETAILS(id));
        setSchema(resp.data);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchema();
    }

    // Resize canvas on mount
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

  }, []);

  const handleBuyClick = async () => {
    try {
      const payload = {
        schemaId: schema.id,
        userId: 1, // Replace with dynamic user ID if available
        amount: schema.price
      };

      const response = await apiClient.post(API_ROUTES.EXPLORE.SUBSCRIBE_STAKE, payload);

      console.log("API response:", response);
      //setShowSuccessModal(true); // Open Success modal
      // On success
      setModalData({
        isOpen: true,
        type: 'success',
        title: 'Subscription Success!',
        content: (
          <>
            <p><strong>Subscription Amount:</strong> {schema.minimumInvestmentAmount} {schema.currency || CURRENCY_UNIT}</p>
            <p><strong>ROI:</strong> {schema.returnPercentage || '2.5'}%</p>
            <p><strong>Mature At:</strong> 21 AUG 2025</p>
          </>
        ),
        footerButtons: [
          {
            label: 'Go to Subscription',
            onClick: handleNavigateToMyStake,
            className: 'btn btn-success',
          },
        ],
      });

      // 🎉 Confetti trigger after modal is set
      setTimeout(() => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
          confetti.create(canvas, { resize: true })({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
          });

          // Optional cleanup after 2 seconds
          setTimeout(() => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }, 2000);
        }
      }, 200);
    } catch (error) {
      //console.log("ERRORR: ", JSON.stringify(error))
      const errorCode =error.response?.errorCode;
      const isInsufficientBalance = ERRORS.INSUFFICIENT_BALANCE === errorCode;
      const buttonLabel = isInsufficientBalance ? 'Deposit' : 'Try Again';

      //setShowWarningModal(true); // Open Warning modal
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Subscription Failed',
        content: (
          <p>{error?.message || 'Something went wrong. Please try again.'}</p>
        ),
        footerButtons: [
          {
            label: buttonLabel,
            onClick: () => {
              setModalData(prev => ({ ...prev, isOpen: false }));
              if (isInsufficientBalance) {
                navigate('/deposit'); // ⬅️ Navigate conditionally
              }
            },
            className: 'btn btn-warning',
          },
        ],
      });
    }
  };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };
  
  const handleNavigateToDeposit = () => {
    //setModalOpen(false); // optional: close modal before navigation
    navigate(`/deposit`);
  };

  const handleNavigateToMyStake = () => {
    navigate('/explore', {
      replace: true,
      state: { activeTab: 'mystake' }
    });
  }

  if (loading) return <div className="item">Loading...</div>;
  if (error) return <div className="item">Error: {error}</div>;
  if (!schema) return null;


  return( 
      <div className='item section__padding'>
        {/* 🎉 Confetti canvas above all content */}
        <canvas id="confetti-canvas" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
          zIndex: 2000
        }} />

        <div className="item-image">
          <img src={schema.imageUrl} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{schema.title}</h1>
              <p>
              From <span>{schema.minimumInvestmentAmount} {schema.currency}</span>
              ‧ {schema.totalReturnPeriods} periods
            </p>
            <p><strong>Contact Address:</strong> <a href='#'>trustai</a></p>
            <p><strong>Owner:</strong>{schema.createdBy}<span></span></p>
            <p><strong>Price:</strong> <span>{schema.minimumInvestmentAmount} {schema.currency || CURRENCY_UNIT}</span></p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>{schema.createdBy}</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{schema.description || description} </p>
            </div>
            <div className="item-content-buy">
              <button 
                className="primary-btn"
                onClick={handleBuyClick}
                >
                Buy For {schema.price} {schema.currency || CURRENCY_UNIT}                
                </button>
              {/* <button className="secondary-btn">Make Offer</button> */}

              {/* <ConfirmModal 
                isOpen={modalOpen} 
                onClose={handleCloseModal}
                onPrimaryAction={handleNavigateToDeposit}
                primaryButtonLabel="Deposit"
                title="Conditions not met"
              /> */}

              {/* { showWarningModal && (
                <WarningModal
                  onClose={() => setShowWarningModal(false)}
                  onUpgrade={handleNavigateToDeposit}
                />
              )} */}


              {/* {showSuccessModal  && (
                <SuccessModal
                  onClose={() => setShowSuccessModal(false)}
                  onSuccess={handleNavigateToDeposit}
                  title={'Subscriptiion Success!!'}
                  footerButtons={[
                    {
                      label: 'Go to Subscription',
                      onClick: handleNavigateToDeposit,
                      className: 'success-button',
                    },
                  ]}
                >
                  <p><strong>Subscription Amount:</strong> 100USDT</p>
                  <p><strong>ROI:</strong> 2.5%</p>
                  <p><strong>Mature At:</strong> 21 AUG 2025</p>
                </SuccessModal>
              )} */}

              {modalData.isOpen && (
                <AlertModal
                    type={modalData.type}
                    icon={modalData.type === 'success' ? SuccessIcon : WarningIcon}
                    onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
                    title={modalData.title}
                    footerButtons={modalData.footerButtons}
                  >
                    {modalData.content}
                  </AlertModal>
              )}


            </div>
          </div>
      </div>
  )
};

export default ExploreDetails;
