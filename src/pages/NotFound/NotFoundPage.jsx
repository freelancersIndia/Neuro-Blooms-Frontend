import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import { Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="py-24 text-center">
      <Container className="max-w-md flex flex-col items-center gap-6">
        <div className="bg-amber-50 text-accent p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-inner animate-float">
          <Compass className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-bold text-accent tracking-widest uppercase font-mono">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-slate-900 font-display">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page you are looking for has been moved, removed, or was typed incorrectly. Let\'s get you back on track.
          </p>
        </div>
        <div className="pt-4">
          <Link to={ROUTES.HOME}>
            <Button size="md" className="shadow-md">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
