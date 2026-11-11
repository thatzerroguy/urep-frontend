'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, SlidersHorizontal, X, Check } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);
    const savedConsent = localStorage.getItem('urep_cookie_consent');
    if (!savedConsent) {
      // Small timeout to give smooth entrance on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      status: 'accepted',
      preferences: { necessary: true, analytics: true, marketing: true },
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('urep_cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleReject = () => {
    const consentData = {
      status: 'rejected',
      preferences: { necessary: true, analytics: false, marketing: false },
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('urep_cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    const consentData = {
      status: 'custom',
      preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('urep_cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner Pill matching image design */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-all">
          
          {/* Left: Cookie Icon + Description */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-800">
              <Cookie className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <p className="text-xs sm:text-sm text-gray-800 leading-snug">
              By clicking &ldquo;Accept&rdquo;, you agree to the storing of cookies on your device.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 shrink-0 w-full sm:w-auto">
            {/* Preferences / Customization Button */}
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              aria-label="Cookie preferences"
              className="p-2 text-gray-600 hover:text-gray-950 hover:bg-gray-100 rounded-full transition-colors"
              title="Cookie Settings"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Reject Button */}
            <button
              type="button"
              onClick={handleReject}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            >
              Reject
            </button>

            {/* Accept Button */}
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-900 active:bg-gray-800 transition-colors shadow-sm cursor-pointer"
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-gray-800" strokeWidth={1.75} />
                <h3 className="font-bold text-gray-900 text-base">Cookie Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Necessary */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-gray-900">Strictly Necessary</span>
                    <span className="text-[10px] font-medium bg-green-100 text-[#277B12] px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Essential for the portal to function properly, including secure login and form sessions.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#277B12] cursor-not-allowed opacity-70"
                />
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="space-y-0.5">
                  <span className="font-semibold text-xs sm:text-sm text-gray-900">Analytics & Performance</span>
                  <p className="text-xs text-gray-500">
                    Help us understand how youths interact with programs to improve portal features.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#277B12] focus:ring-[#277B12] cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="space-y-0.5">
                  <span className="font-semibold text-xs sm:text-sm text-gray-900">Marketing & Recommendations</span>
                  <p className="text-xs text-gray-500">
                    Used to provide relevant youth empowerment program updates and announcements.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#277B12] focus:ring-[#277B12] cursor-pointer"
                />
              </div>
            </div>

            <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#277B12] hover:bg-[#1b5c0d] rounded-full transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

