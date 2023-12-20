import { Footer } from 'flowbite-react';

export function FooterLayout() {
    return (
        <Footer container className="bg-blue-500">
            <Footer.Copyright className="font-semibold text-white" by="ihbhuiyan28" year={new Date().getFullYear()} />
        </Footer>
    );
}
