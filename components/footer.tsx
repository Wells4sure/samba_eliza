import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4" />
        <h3 className="text-2xl font-script mb-4">Elizabeth & Samba</h3>
        <p className="font-sans text-gray-300 mb-6">
          December 07th, 2025 • O'twa Events, Lusaka
        </p>

        <div className="border-t border-gray-700 pt-6">
          <p className="font-sans text-sm text-gray-400">
            Questions? Contact us at{" "}
            <a
              href="mailto:iamwchanda@gmail.com"
              className="text-rose-400 hover:underline"
            >
              WC Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
