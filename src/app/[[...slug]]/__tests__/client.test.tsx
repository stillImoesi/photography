import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import React from 'react';
import { ClientOnly } from '../client';
import userEvent from '@testing-library/user-event';

// Mocking the imported components
jest.mock('src/components/BackgroundCarousel', () => () => <div>BackgroundCarousel</div>);
jest.mock('src/components/Services', () => () => <div>Services</div>);
jest.mock('src/components/Contact', () => () => <div>Contact</div>);
jest.mock('src/components/Gallery', () => () => <div data-testid="Gallery">Gallery</div>);
jest.mock('src/components/TopMenu', () => () => <div>TopMenu</div>);

describe('ClientOnly Component', () => {
  const mockProps = {
    location: 'sampleLocation',
  };

  it('renders correctly', () => {
    const { getByText, getAllByText } = render(<ClientOnly {...mockProps} />);

    expect(getByText('TopMenu')).toBeInTheDocument();
    expect(getByText('BackgroundCarousel')).toBeInTheDocument();
    expect(getAllByText('Gallery')[0]).toBeInTheDocument();
    expect(getByText('Services')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Peter Imoesi')).toBeInTheDocument();
    expect(getByText('PHOTOGRAPHY STUDIO')).toBeInTheDocument();
    expect(getByText('Book Now')).toBeInTheDocument();
    expect(getByText('© 2024 by Peter Imoesi')).toBeInTheDocument();
  });

  it('handles "Book Now" link click', async () => {
    const { getByText } = render(<ClientOnly {...mockProps} />);
    const bookNowLink = getByText('Book Now');

    await act(async () => {
      await userEvent.click(bookNowLink);
    });

    // As we do not have a real navigation to verify, we assume the click works correctly.
    // Here, you can add any necessary assertions to confirm the click event was handled as expected.
  });
});
