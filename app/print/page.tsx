'use client';

import Image from "next/image";
import { useEffect } from "react";
import type { PropsWithChildren } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/ethanfrome" : "");
const asset = (path: string) => `${basePath}${path}`;

export default function PrintPage() {
  useEffect(() => {
    // Optional: Auto-trigger print dialog when page loads
    // window.print();
  }, []);

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 0.5in;
          }
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* No-print: Print button for screen view */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <button
          onClick={() => window.history.back()}
          className="bg-white px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-gray-100 transition-colors border border-gray-300"
        >
          ← Back to Listing
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M6 9V2H18V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 14H6V22H18V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Print Flyer
        </button>
      </div>

      {/* Print-optimized Flyer */}
      <div className="max-w-4xl print-container mx-auto bg-white p-8 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-800">
          <div className="flex items-center gap-3">
            <Image
              src={asset("/assets/logo22.png")}
              alt="Starkfield Realty logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
            <div>
              <div className="text-2xl font-bold text-gray-900">Starkfield Realty</div>
              <div className="text-sm text-gray-600">Premium Properties Since 1911</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900">E. Wharton</div>
            <div className="text-sm text-gray-600">Realist Agent</div>
            <div className="text-xs text-gray-500 mt-1">(555) DESPAIR</div>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-6">
          <h1 className="text-8xl font-bold text-gray-900 mb-3 tracking-tight leading-none">
            Starkfield Farmhouse Listing
          </h1>
          <p className="text-2xl text-gray-600 italic mb-2">
            Where dreams freeze and duty endures
          </p>
          <div className="flex justify-center gap-3">
            <span className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              Off Market
            </span>
            <span className="px-4 py-2 bg-red-100 text-red-900 rounded-full text-sm font-medium border border-red-300">
              Entrapment
            </span>
          </div>
        </div>

        {/* Photo Grid + QR */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="col-span-2 row-span-2">
            <Image
              src={asset("/assets/sled-hill.png")}
              alt="The notorious hill with elm tree at bottom"
              width={1200}
              height={800}
              className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
            />
          </div>
          <div>
            <Image
              src={asset("/assets/winter-window.png")}
              alt="Frosted window view"
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
          </div>
          <div className="relative flex flex-col gap-3">
            <Image
              src={asset("/assets/extra-photo.png")}
              alt="Additional property view"
              width={400}
              height={200}
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
            <div className="flex justify-center">
              <Image
                src={asset("/assets/qrcode.png")}
                alt="QR code to Starkfield listing"
                width={120}
                height={120}
                className="border border-gray-300 rounded-lg p-2 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 bg-gray-50 p-5 rounded-lg border border-gray-300">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Beds</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">1</div>
            <div className="text-sm text-gray-600">Bath</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">1,847</div>
            <div className="text-sm text-gray-600">Sqft</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">100</div>
            <div className="text-sm text-gray-600">Winters</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b pb-2">Property Description</h2>
          <div className="text-gray-700 leading-relaxed text-sm space-y-2">
            <p>
              This storied Starkfield farmhouse offers a rare opportunity for those seeking authentic New England isolation. Set against an unforgiving landscape of endless winter, the property features original hardwood floors worn smooth by decades of resigned footsteps and windows that frame nothing but white silence.
            </p>
            <p>
              The kitchen serves as the heart of domestic obligation, complete with period-appropriate tension and a history of shattered heirlooms. Notable features include inadequate heating that mirrors the warmth of human connection, a spare bedroom ideal for unwanted relatives, and stunning views of moral constraints.
            </p>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Property Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Property Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Year Built:</span>
                <span className="font-medium text-gray-900">1911</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heat:</span>
                <span className="font-medium text-gray-900">Inadequate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type:</span>
                <span className="font-medium text-gray-900">Single Family</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heating:</span>
                <span className="font-medium text-gray-900">Wood stove</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">HOA:</span>
                <span className="font-medium text-gray-900">Social pressure</span>
              </div>
            </div>
          </div>

          {/* Key Disclosures */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Key Disclosures</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Shattered pickle dish (irreparable)</li>
              <li>Foundation built on duty, not choice</li>
              <li>Downhill run ends at elm tree</li>
              <li>Prolonged exposure to silence</li>
              <li>Site of profound restraint (1911)</li>
            </ul>
          </div>
        </div>

        {/* Neighborhood Map */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Neighborhood</h3>
          <svg className="w-full h-48 border border-gray-300 rounded-lg" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="300" fill="#e8e8e0"/>
            <line x1="100" y1="150" x2="500" y2="150" stroke="#666" strokeWidth="2"/>
            <line x1="300" y1="30" x2="300" y2="270" stroke="#666" strokeWidth="2"/>
            <ellipse cx="450" cy="80" rx="50" ry="30" fill="#c9c9c1" stroke="#888" strokeWidth="2"/>
            <text x="450" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">The Hill</text>
            <rect x="280" y="135" width="40" height="30" fill="#8b7355" stroke="#5a4a3a" strokeWidth="2"/>
            <polygon points="300,125 280,135 320,135" fill="#5a4a3a"/>
            <circle cx="300" cy="150" r="20" fill="rgba(139,0,0,0.3)" stroke="#8b0000" strokeWidth="2"/>
            <text x="300" y="195" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8b0000">FROME FARM</text>
            <rect x="150" y="145" width="20" height="18" fill="#d4d4ca" stroke="#888" strokeWidth="1"/>
            <polygon points="160,135 150,145 170,145" fill="#999"/>
            <text x="160" y="175" textAnchor="middle" fontSize="10" fill="#333">Church</text>
            <circle cx="180" cy="70" r="25" fill="#b8b8aa" stroke="#888" strokeWidth="2"/>
            <text x="180" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333">Starkfield</text>
            <circle cx="470" cy="135" r="6" fill="#3a5a3a" stroke="#2a4a2a" strokeWidth="2"/>
            <text x="470" y="125" textAnchor="middle" fontSize="9" fill="#333" fontWeight="bold">Elm</text>
          </svg>
          <p className="text-xs text-gray-600 mt-2">
            <strong>Starkfield, MA</strong> - Community defined by endurance and winter. Amenities: church, sawmill, The Hill.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-800 pt-4 mt-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-600 mb-1">
                Student parody project inspired by <em>Ethan Frome</em> by Edith Wharton
              </p>
              <p className="text-xs text-gray-500">
                Educational use only • No actual properties listed
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Contact</p>
              <p className="text-xs text-gray-600">E. Wharton, Realist Agent</p>
              <p className="text-xs text-gray-600">StarkfieldRealty.edu</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
