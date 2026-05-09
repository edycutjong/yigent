import { render, screen } from '@testing-library/react';
import AboutPage from './page';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
  it('renders correctly', () => {
    render(<AboutPage />);
    expect(screen.getByText('EitherWay')).toBeDefined();
    expect(screen.getByText('WHAT IT DOES')).toBeDefined();
    expect(screen.getByText('TECH STACK')).toBeDefined();
    
    const hackathonSection = screen.getByText('HACKATHON').closest('div');
    expect(hackathonSection).toHaveTextContent(/Built for Colosseum Frontier Hackathon 2026/);
  });
});
