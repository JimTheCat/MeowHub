import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Dla dodatkowych matcherów

import { ContainerVhVw } from '../Components/ContainerVhVw'; // Import komponentu

test('renders ContainerVhVw with given vw and vh values', () => {
    // Ustaw wartości vw i vh
    const vw = 50;
    const vh = 40;

    // Renderuj komponent z odpowiednimi propertisami
    const { container } = render(
        <ContainerVhVw vw={vw} vh={vh}>
            <div>Test Content</div>
        </ContainerVhVw>
    );

    // Sprawdź, czy szerokość i wysokość komponentu jest ustawiona zgodnie z propertisami
    expect(container.firstChild).toHaveStyle(`width: ${vw}vw`);
    expect(container.firstChild).toHaveStyle(`height: ${vh}vh`);

    // Sprawdź, czy zawartość komponentu jest renderowana poprawnie
    expect(container.firstChild).toHaveTextContent('Test Content');
});
