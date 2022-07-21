import "./styles.css";

function ReferralContent({ userReferralCode }) {
  return (
    <div className="content-promotions">
      <div className="promotion-content-container">
        <div className="promotion-left">
          <h1 className="promotion-title">Refer and get FREE services</h1>
          <div className="referral-code-container">
            <p className="referral-code-text">Your Code: </p>
            <p className="referral-code">{userReferralCode}</p>
          </div>
          <p className="promotion-text">
            Invite your friends to Jamr. They get instant ₹100 off. You win upto
            ₹5000 in rewards.
          </p>
          <div className="promotion-refer-via">
            <div className="promotion-refer-via-item"></div>
            <p className="refer">Refer Via</p>
            <div className="promotion-refer-via-item"></div>
          </div>
          <div className="promotion-refer-platforms">
            <div className="promotion-refer-platforms-item"></div>
            <div className="promotion-refer-platforms-item"></div>
            <div className="promotion-refer-platforms-item"></div>
          </div>
        </div>
        <div className="promotion-right">
          <img
            className="promotion-img"
            src="https://i.ibb.co/9cj4bTR/Screenshot-346-1.png"
            alt="promotion"
          />
        </div>
      </div>
      <div className="promotion-bottom">
        <div className="promotion-bottom-title">
          <h1 className="promotion-title">
            Refer everyone - The most generous referral program
          </h1>
        </div>
        <div className="promotion-data">
          <div className="promotion-data-item">
            <img
              className="promotion-data-icon"
              src="https://i.ibb.co/QJ0NXCq/Frame.png"
              alt="Frame"
              border="0"
            />
            <p className="promotion-data-text">
              Invite all friends even if they have tried us. You will get
              rewarded everytime.
            </p>
          </div>
          <div className="promotion-data-item">
            <img
              className="promotion-data-icon"
              src="https://i.ibb.co/6wPsc4S/Group-45.png"
              alt="Group-45"
              border="0"
            ></img>
            <p className="promotion-data-text">
              Upon inviting, we’ll give them rewards for the services they
              havent tried yet.
            </p>
          </div>
          <div className="promotion-data-item">
            <img
              className="promotion-data-icon"
              src="https://i.ibb.co/W2w3P0d/Vector.png"
              alt="Vector"
              border="0"
            />
            <p className="promotion-data-text">
              For every successful signup, you can win upto ₹5000, and minimum
              ₹100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralContent;
