import React, { useRef, useImperativeHandle, forwardRef } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad?: () => void;
  }
}

interface ReCaptchaProps {
  siteKey: string;
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal';
  className?: string;
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
  getResponse: () => string | null;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(({
  siteKey,
  onChange,
  onExpired,
  onError,
  theme = 'light',
  size = 'normal',
  className = ''
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    },
    execute: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.execute(widgetIdRef.current);
      }
    },
    getResponse: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        return window.grecaptcha.getResponse(widgetIdRef.current);
      }
      return null;
    }
  }));

  React.useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && containerRef.current) {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onChange?.(token),
          'expired-callback': () => {
            onChange?.(null);
            onExpired?.();
          },
          'error-callback': () => onError?.(),
          theme,
          size
        });
      }
    };

    if (window.grecaptcha && window.grecaptcha.render) {
      loadRecaptcha();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;

      window.onRecaptchaLoad = loadRecaptcha;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.onRecaptchaLoad;
      };
    }

    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [siteKey, theme, size, onChange, onExpired, onError]);

  return <div ref={containerRef} className={className} />;
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;