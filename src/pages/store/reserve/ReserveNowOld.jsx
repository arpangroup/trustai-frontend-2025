import React, { useEffect, useState } from 'react';
import './ReserveNow.css';

import { useLocation, useNavigate } from 'react-router';
import apiClient from '../../../api/apiClient';
import { API_ROUTES } from '../../../api/apiRoutes';
import { RANK_LABEL_MAP } from '../../../constants/config';

import CustomDropdown from '../../../components/input/dropdown/CustomDropdown';
import Countdown from '../../../components/countdown/Countdown';


import SuccessIcon from '../../../assets/icons/success.png';
import WarningIcon from '../../../assets/icons/warming.png';
import AlertModal from '../../../components/modal/success/AlertModal';
import AnimationModal from '../../../components/modal/animation/AnimationModal';


import AnimationCandlestick from '../../../assets/animation/Candlestick-chart-with-tradingview-colors.json';
import AnimationGrowth from '../../../assets/animation/Growth.json';
import AnimationLoading from '../../../assets/animation/loading-animation.json';
import AnimationGraph from '../../../assets/animation/LottieGraphs.json';
import AnimationCandleLoading from '../../../assets/animation/Stock-candle-loading.json';
import AnimationConfetti from '../../../assets/animation/Confetti -FullScreen.json';



const Animations = [
  AnimationLoading,
  AnimationGrowth,
  AnimationConfetti
]




function formatAmount(value) {
  const num = Number(value);
  return num >= 1000 ? `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K` : `${num}`;
}


const ReserveNow = ({reservedStakes = [], onReservedSuccess}) => {
    
  const navigate = useNavigate();
  const [investmentOptions, setInvestmentOptions] = useState([]); // original full data
  const [dropdownOptions, setDropdownOptions] = useState([]);     // for CustomDropdown
  const [selectedInvestmentRange, setSelectedInvestmentRange] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expiryAt, setExpiryAt] = useState(null);
  const [showLoadingAnimationModal, setShowLoadingAnimationModal] = useState(false);
  const [showTradingAnimationModal, setTradingAnimationModal] = useState(false);

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: '', // 'success' or 'error'
    title: '',
    content: '',
    footerButtons: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiClient.get(API_ROUTES.INVESTMENTS_API.ELIGIBLE_SUMMARY);
        const allRanks = res.data || [];
        setInvestmentOptions(allRanks);

        // Format for Rank dropdown with default header option
        const dropdownFormatted = [
          { value: null, label: "Lv", subLabel: "Income%", disabled: true },
          ...allRanks.map(rank => ({
            value: rank.rankCode,
            label: RANK_LABEL_MAP[rank.rankCode] || rank.rankCode, // fallback to rankCode if not mappe
            subLabel: rank.incomePercentageRange
          }))
        ];
        setDropdownOptions(dropdownFormatted);

        // Select first enabled rank as default
        const firstEnabled = allRanks.find(rank => rank.enabled);
        if (firstEnabled) {
          setSelectedRank(firstEnabled);
        }

      } catch (error) {
        console.error('Error fetching investment options:', error);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (
  //     Array.isArray(reservedStakes) &&
  //     reservedStakes.length > 0 &&
  //     reservedStakes[0].sold &&
  //     reservedStakes[0].expiryAt != null
  //   ) {
  //     setExpiryAt(reservedStakes[0].expiryAt);
  //   }
  // }, [reservedStakes]);

  useEffect(() => {
    if (Array.isArray(reservedStakes) && reservedStakes.length > 0) {
      const now = Date.now();

      // Find the first stake that has not expired yet
      const activeStake = reservedStakes.find(
        (stake) => stake.sold !== true && stake.expiryAt && new Date(stake.expiryAt).getTime() > now
      );

      if (activeStake) {
        setExpiryAt(activeStake.expiryAt);
      } else {
        setExpiryAt(null);
      }
    }
}, [reservedStakes]);


  // When selectedRank changes, reset selectedInvestmentRange
  useEffect(() => {
    if (selectedRank) {
      setSelectedInvestmentRange(
        `${selectedRank.minDeposit}-${selectedRank.maxDeposit}`
      );
    } else {
      setSelectedInvestmentRange(null);
    }
  }, [selectedRank]);

  const handleRankChange = (code) => {
    const rank = investmentOptions.find(r => r.rankCode === code);
    setSelectedRank(rank);
  };

  const handleInvestmentRangeChange = (value) => {
    setSelectedInvestmentRange(value);
  };

  const handleNavigateToTodaysStake = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
    navigate('/reservation', {
      replace: true,
      state: { activeTab: 'Todays' }
    });
  }

  const handleReserveClick = async () => {
    if (!selectedRank || !selectedInvestmentRange) {
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Please select a valid rank and investment range.',
        content: null
      });
      return;
    }

    if("RANK_0" === selectedRank.rankCode && selectedRank.txnLimit === 0) {
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Not Eligible for Reservation',
        content: (
          <p>To earn daily income, please upgrade your account by maintaining a minimum deposit balance of $40.</p>
        ),
        footerButtons: [
          {
            label: 'Deposit Balance',
            onClick: () => { navigate('/deposit')},
            className: 'btn btn-success',
          },
        ],
      });
      return;
    }

    if(selectedRank.txnLimit === 0) {
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Daily Transaction Limit Reached!',
        content: (
          <p>You are allowed only one transaction per day. Please try again tomorrow.</p>
        ),
      });
      return;
    }

    try {
      const payload = {
        rankCode: selectedRank.rankCode,
        investmentRange: selectedInvestmentRange,
      };
      setShowLoadingAnimationModal(true);

      //const response = await apiClient.post(API_ROUTES.RESERVATION_API.RESERVE_NOW, payload);
      //window.location.reload();

      //setExpiryAt(response.expiryAt);
      //onReservedSuccess(response);
      //handleNavigateToTodaysStake();
    } catch (error) {
      console.error('Error while reserving:', error);
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Reservation Failed',
        content: (
          <p>{error?.message || 'Something went wrong. Please try again.'}</p>
        ),
      });
    }
  };


  // Prepare options for Investment Range dropdown (currently just one range per rank)
  const investmentRangeOptions = selectedRank ? [
    {
      value: `${selectedRank.minDeposit}-${selectedRank.maxDeposit}`,
      label: `${formatAmount(selectedRank.minDeposit)} - ${formatAmount(selectedRank.maxDeposit)}`
    }
  ]
    : [];


  if (expiryAt) {
    const expiryTime = new Date(expiryAt).getTime();
    const now = Date.now();
    const timeRemainingInSeconds = Math.max(Math.floor((expiryTime - now) / 1000), 0); // prevent negative time

    return <Countdown initialTimeInSeconds={timeRemainingInSeconds} />;
  }



    return (
        <div className="reserve-now">
            <div className="reserve-content">
                {/* Rank Dropdown */}
                <div className="select-wrapper">
                    <CustomDropdown
                        options={dropdownOptions}
                        selectedValue={selectedRank?.rankCode || ''}
                        onChange={handleRankChange}
                    />
                </div>

                {/* Investment Range Dropdown */}
                <div className="select-wrapper">
                    <CustomDropdown
                        options={investmentRangeOptions}
                        selectedValue={selectedInvestmentRange || ''}
                        onChange={handleInvestmentRangeChange}
                        disabled={!selectedRank}
                    />
                </div>

            </div>

            {/* Reserve Now Button - only enabled if selectedRank is enabled */}
            <button
                className="reserve-btn"
                disabled={!selectedRank?.enabled}
                onClick={handleReserveClick}
            >
                Reserve Now
            </button>

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

            <AnimationModal
              isOpen={showLoadingAnimationModal}
              title="Matching you with a trader..."
              animationSrc={Animations[0]}
              loopCount={5}
              onClose={() => {
                setShowLoadingAnimationModal(false);
                setTimeout(() => setTradingAnimationModal(true), 100);
              }}
            />

            <AnimationModal
              isOpen={showTradingAnimationModal}
              // title="Reservation Successful!"
              animationSrc={Animations[1]}
              loopCount={1000}
              onClose={() => {
                setTradingAnimationModal(false);
                window.location.reload();
              }}
              // footerButtons={[
              //   {
              //     label: 'Go to Reservations',
              //     onClick: () => navigate('/reservation'),
              //     className: 'btn-success'
              //   }
              // ]}
            />

        </div>
    );
};

export default ReserveNow;