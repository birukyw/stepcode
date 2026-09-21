import { useContext, useState } from 'react';
import { AppContext } from '../App';
import PixelSprite from './PixelSprite';

export default function TinyShopModal({ onClose }) {
  const { stats, buyHeartWithCoins, exchangeXpForCoins, showToast } = useContext(AppContext);
  const [animatingHeart, setAnimatingHeart] = useState(false);
  const [animatingCoin, setAnimatingCoin] = useState(false);

  const hearts = stats.hearts !== undefined ? stats.hearts : 1;
  const coins = stats.coins || 0;
  const totalXp = stats.totalXp || 0;

  const HEART_COST = 50;
  const canBuyHeart = coins >= HEART_COST && hearts < 5;

  const handleBuyHeart = () => {
    if (!canBuyHeart) return;
    setAnimatingHeart(true);
    const success = buyHeartWithCoins(HEART_COST);
    if (success) {
      setTimeout(() => setAnimatingHeart(false), 600);
    } else {
      setAnimatingHeart(false);
    }
  };

  const handleExchange = (xpAmount, coinAmount) => {
    if (totalXp < xpAmount) {
      showToast(`Need ${xpAmount - totalXp} more XP! ⚡`);
      return;
    }
    setAnimatingCoin(true);
    exchangeXpForCoins(xpAmount, coinAmount);
    setTimeout(() => setAnimatingCoin(false), 600);
  };

  return (
    <div className="tiny-shop-backdrop" onClick={onClose}>
      <div className="tiny-shop-modal" onClick={e => e.stopPropagation()}>
        {/* Header with Pixel Shopkeeper */}
        <div className="tiny-shop-header">
          <div className="tiny-shop-header__title-row">
            <PixelSprite name="shop" size={28} style={{ marginRight: 8 }} />
            <div>
              <h2 className="tiny-shop-title">The Pixel Bazaar</h2>
              <span className="tiny-shop-subtitle">Guild Merchant & Heart Apothecary</span>
            </div>
            <button className="tiny-shop-close-btn" onClick={onClose} title="Close Shop">
              ✕
            </button>
          </div>

          {/* Player Wallet HUD */}
          <div className="tiny-shop-wallet">
            <div className={`wallet-item wallet-item--coins ${animatingCoin ? 'wallet-item--bounce' : ''}`}>
              <PixelSprite name="coin" size={16} />
              <span><strong>{coins}</strong> Coins</span>
            </div>

            <div className={`wallet-item wallet-item--hearts ${animatingHeart ? 'wallet-item--pulse' : ''}`}>
              <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {[0, 1, 2, 3, 4].map(idx => (
                  <PixelSprite
                    key={idx}
                    name={idx < hearts ? 'heart' : 'heart-empty'}
                    size={14}
                  />
                ))}
              </div>
              <span><strong>{hearts}/5</strong> Hearts</span>
            </div>

            <div className="wallet-item wallet-item--xp">
              <PixelSprite name="sparkle" size={14} />
              <span><strong>{totalXp}</strong> XP</span>
            </div>
          </div>
        </div>

        {/* Shop Items Section */}
        <div className="tiny-shop-body">
          {/* Item 1: Buy Hearts */}
          <div className="tiny-shop-card">
            <div className="shop-card__icon-box">
              <PixelSprite name="heart" size={32} animated />
            </div>
            <div className="shop-card__details">
              <div className="shop-card__title-row">
                <h3 className="shop-card__title">Streak Shield Heart</h3>
                <span className="shop-card__price">
                  <PixelSprite name="coin" size={14} style={{ marginRight: 4 }} />
                  {HEART_COST} Coins
                </span>
              </div>
              <p className="shop-card__desc">
                Automatically consumes 1 heart if you miss a day, safeguarding your coding streak from resetting. Max capacity is <strong>5 hearts</strong>.
              </p>
              <div className="shop-card__status">
                {hearts >= 5 ? (
                  <span className="badge badge--success">MAX HEARTS CAPACITY (5/5) ❤️</span>
                ) : (
                  <span className="badge badge--info">Current: {hearts} / 5 Hearts</span>
                )}
              </div>
            </div>
            <button
              className={`btn btn-primary shop-card__buy-btn ${!canBuyHeart ? 'btn--disabled' : ''}`}
              onClick={handleBuyHeart}
              disabled={!canBuyHeart}
            >
              {hearts >= 5 ? 'Maxed Out' : coins < HEART_COST ? `Need ${HEART_COST - coins} More 🪙` : 'Buy +1 Heart ❤️'}
            </button>
          </div>

          {/* Item 2: Exchange XP for Coins */}
          <div className="tiny-shop-card">
            <div className="shop-card__icon-box" style={{ background: 'rgba(250, 204, 21, 0.1)' }}>
              <PixelSprite name="coin" size={32} animated />
            </div>
            <div className="shop-card__details">
              <div className="shop-card__title-row">
                <h3 className="shop-card__title">Exchange XP for Gold Coins</h3>
                <span className="badge badge--gold">GOLD MINT</span>
              </div>
              <p className="shop-card__desc">
                Trade your accrued quest XP into gold coins for the merchant! <em>(Note: Your permanent course rank and progress toward Max Level are never penalized).</em>
              </p>

              {/* Quick Trade Tier Buttons */}
              <div className="xp-exchange-tiers">
                {[
                  { xp: 50, coins: 25 },
                  { xp: 100, coins: 50 },
                  { xp: 200, coins: 100 },
                ].map(tier => {
                  const hasEnough = totalXp >= tier.xp;
                  return (
                    <button
                      key={tier.xp}
                      className={`exchange-tier-btn ${!hasEnough ? 'exchange-tier-btn--disabled' : ''}`}
                      onClick={() => handleExchange(tier.xp, tier.coins)}
                      disabled={!hasEnough}
                    >
                      <div className="tier-cost">⚡ {tier.xp} XP</div>
                      <div className="tier-arrow">➜</div>
                      <div className="tier-gain">🪙 +{tier.coins} Coins</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="tiny-shop-footer">
          <span>💡 Tip: Earn more XP by completing lessons, coding exercises, and quizzes across your careers!</span>
        </div>
      </div>
    </div>
  );
}
