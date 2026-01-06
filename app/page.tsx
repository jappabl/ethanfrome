'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, type KeyboardEvent } from "react";

export default function Home() {
  const [saved, setSaved] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [dialog, setDialog] = useState<{ title: string; message: string[] } | null>(null);

  const allPhotos = [
    { src: "/assets/comp-wharton.png", alt: "Isolated Starkfield farmhouse in deep winter, surrounded by bare trees and endless snow" },
    { src: "/assets/kitchen-table.png", alt: "Sparse kitchen with a broken red pickle dish on worn wooden table" },
    { src: "/assets/winter-window.png", alt: "Frosted window overlooking desolate snow-covered fields" },
    { src: "/assets/red-scarf.png", alt: "Red scarf draped over a chair in dim lamplight" },
    { src: "/assets/sled-hill.png", alt: "Steep hill descent leading toward a large elm tree" },
    { src: "/assets/comp-mill.png", alt: "The nearby sawmill structure in winter" },
    { src: "/assets/comp-church.png", alt: "Starkfield church in the snow" },
    { src: "/assets/comp-shadow.png", alt: "Another view of the farmhouse in shadows" },
    { src: "/assets/extra-photo.png", alt: "Additional property view showing the stark winter landscape" },
  ];

  const openGallery = (index: number) => {
    setCurrentImage(index);
    setGalleryOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allPhotos.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const openDialog = (title: string, message: string[]) => {
    setDialog({ title, message });
  };

  const closeDialog = () => setDialog(null);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      openDialog("Search Interrupted", [
        "There seems to be something keeping you here...",
      ]);
    }
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGalleryOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Dialog */}
      {dialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
              <div className="font-semibold text-lg">{dialog.title}</div>
              <button
                onClick={closeDialog}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 space-y-3 text-gray-900">
              {dialog.message.map((line, idx) => (
                <p key={idx} className="text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={closeDialog}
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            ×
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-5xl hover:text-gray-300 z-10"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-5xl hover:text-gray-300 z-10"
          >
            ›
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full px-16">
            <Image
              src={allPhotos[currentImage].src}
              alt={allPhotos[currentImage].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <p className="text-white text-center mt-4 text-sm">
              {currentImage + 1} / {allPhotos.length}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo22.png"
                alt="Starkfield Realty logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search Starkfield, MA"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
                  onKeyDown={handleSearchKeyDown}
                />
              </div>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                saved ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"}>
                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title Block */}
          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-6xl font-bold text-gray-900 mb-2 tracking-tight">
                  Starkfield Farmhouse Listing
                </h1>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium">
                  Off Market
                </span>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[450px]">
            <div
              className="col-span-2 row-span-2 relative group cursor-pointer"
              onClick={() => openGallery(0)}
            >
              <Image
                src={allPhotos[0].src}
                alt={allPhotos[0].alt}
                width={1200}
                height={800}
                className="w-full h-full object-cover rounded-l-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-l-lg" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => openGallery(1)}
            >
              <Image
                src={allPhotos[1].src}
                alt={allPhotos[1].alt}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => openGallery(2)}
            >
              <Image
                src={allPhotos[2].src}
                alt={allPhotos[2].alt}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-tr-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-tr-lg" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => openGallery(3)}
            >
              <Image
                src={allPhotos[3].src}
                alt={allPhotos[3].alt}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div className="relative group cursor-pointer">
              <div onClick={() => openGallery(4)} className="w-full h-full">
                <Image
                  src={allPhotos[4].src}
                  alt={allPhotos[4].alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-br-lg"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-br-lg" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openGallery(0);
                }}
                className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors z-10 border border-gray-900"
              >
                <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" strokeWidth="2"/>
                </svg>
                <span className="text-sm font-semibold text-gray-900">View all {allPhotos.length} photos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Facts Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-900 mt-1">Beds</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">1</div>
                  <div className="text-sm text-gray-900 mt-1">Bath</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">1,847</div>
                  <div className="text-sm text-gray-900 mt-1">Sqft</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">100</div>
                  <div className="text-sm text-gray-900 mt-1">Winters</div>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-900">Heat:</span>
                  <span className="font-medium text-gray-900">Inadequate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Lot Size:</span>
                  <span className="font-medium text-gray-900">Endless isolation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">HOA:</span>
                  <span className="font-medium text-gray-900">Social pressure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Year Built:</span>
                  <span className="font-medium text-gray-900">1911</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Property Type:</span>
                  <span className="font-medium text-gray-900">Single Family (Trapped)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Heating:</span>
                  <span className="font-medium text-gray-900">Wood stove, resentment</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
              <div className="prose max-w-none text-gray-900 leading-relaxed space-y-4">
                <p>
                  This historic Starkfield farmhouse offers a rare chance to own a piece of authentic New England endurance. Nestled in a landscape where winter appears to have signed a long-term lease, the home features original hardwood floors polished smooth by years of pacing, brooding, and reconsidering life choices. The windows look out onto a tranquil expanse of snow, trees, and absolutely nothing else.
                </p>
                <p>
                  The kitchen functions as the emotional and logistical center of the house. It is fully equipped for silent meals, restrained arguments, and the careful handling of fragile heirlooms. Thoughtful updates include sturdier doors, improved structural support, and a layout that encourages quiet reflection on what might have been.
                </p>
                <p>
                  A gently sloping hill behind the property provides convenient sledding access, historically associated with moments of poor judgment and permanent consequences. Additional highlights include heating that builds character, a spare bedroom well-suited for unexpected guests who stay too long, and views that inspire deep contemplation of duty and restraint.
                </p>
                <p>
                  The home comes furnished with a strong sense of responsibility, a collection of unresolved tensions, and the comforting knowledge that leaving is harder than it looks. Previous occupants remained for life, which speaks either to the property’s charm or its effectiveness.
                </p>
                <p>
                  Ideal for buyers seeking timeless craftsmanship, rural solitude, and a home that understands disappointment. Pickle dish not included.
                </p>
              </div>
            </div>

            {/* Agent Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agent Notes</h2>
              <div className="space-y-4">
                <div className="flex gap-3 p-4 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Showing Instructions</p>
                    <p className="text-gray-900">
                      Viewings available during daylight hours only. Bring extra layers; the cold here goes deeper than the thermometer suggests. Do not mention happier times.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Occupancy</p>
                    <p className="text-gray-900">
                      Owner-occupied by three souls in various states of resigned cohabitation. Current residents may appear to be present but are emotionally unavailable.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Special Conditions</p>
                    <p className="text-gray-900">
                      No sudden sledding. Please respect the elm tree. Red accessories trigger strong emotional responses and are discouraged during viewings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclosures */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Disclosures</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Material Defects</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-900">
                    <li>Known history of shattered pickle dish (irreparable)</li>
                    <li>Structural integrity of marriage: compromised</li>
                    <li>Foundation built on duty rather than choice</li>
                    <li>Windows seal in despair more effectively than cold</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Environmental Hazards</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-900">
                    <li>Seasonal hazard: Downhill run ending at an elm tree</li>
                    <li>Prolonged exposure to silence and snow</li>
                    <li>Toxic atmosphere of unspoken longing</li>
                    <li>High concentration of suppressed desires</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Historical Significance</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-900">
                    <li>Site of profound romantic restraint (1911)</li>
                    <li>Documented case of emotional frostbite</li>
                    <li>Preserved as monument to obligation</li>
                    <li>Listed on Register of Quiet Tragedies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Neighborhood Map */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Neighborhood & Nearby</h2>
              <div className="mb-4">
                <svg className="w-full h-96 border border-gray-200 rounded-lg" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="400" fill="#e8e8e0"/>
                  <line x1="100" y1="200" x2="500" y2="200" stroke="#666" strokeWidth="3"/>
                  <line x1="300" y1="50" x2="300" y2="350" stroke="#666" strokeWidth="2"/>
                  <ellipse cx="450" cy="120" rx="60" ry="40" fill="#c9c9c1" stroke="#888" strokeWidth="2"/>
                  <text x="450" y="125" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">The Hill</text>
                  <rect x="270" y="180" width="60" height="40" fill="#8b7355" stroke="#5a4a3a" strokeWidth="2"/>
                  <polygon points="300,165 270,180 330,180" fill="#5a4a3a"/>
                  <circle cx="300" cy="200" r="25" fill="rgba(139,0,0,0.3)" stroke="#8b0000" strokeWidth="2"/>
                  <text x="300" y="250" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#8b0000">FROME FARM</text>
                  <rect x="140" y="190" width="30" height="25" fill="#d4d4ca" stroke="#888" strokeWidth="2"/>
                  <polygon points="155,175 140,190 170,190" fill="#999"/>
                  <rect x="152" y="175" width="6" height="15" fill="#999"/>
                  <text x="155" y="230" textAnchor="middle" fontSize="12" fill="#333">Church</text>
                  <rect x="380" y="280" width="35" height="25" fill="#8b7355" stroke="#666" strokeWidth="2"/>
                  <line x1="385" y1="285" x2="410" y2="300" stroke="#666" strokeWidth="2"/>
                  <text x="397" y="320" textAnchor="middle" fontSize="12" fill="#333">Sawmill</text>
                  <circle cx="180" cy="100" r="30" fill="#b8b8aa" stroke="#888" strokeWidth="2"/>
                  <text x="180" y="105" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#333">Starkfield</text>
                  <text x="180" y="140" textAnchor="middle" fontSize="11" fill="#555">Center</text>
                  <circle cx="470" cy="180" r="8" fill="#3a5a3a" stroke="#2a4a2a" strokeWidth="2"/>
                  <text x="470" y="165" textAnchor="middle" fontSize="11" fill="#333" fontWeight="bold">The Elm</text>
                  <line x1="330" y1="200" x2="440" y2="180" stroke="#999" strokeWidth="1" strokeDasharray="3,3"/>
                  <text x="385" y="185" textAnchor="middle" fontSize="10" fill="#666">0.3 mi</text>
                </svg>
              </div>
              <p className="text-gray-900 leading-relaxed">
                <strong>Starkfield, Massachusetts</strong> - A community defined by endurance and the weight of winter. Local amenities include a church for solemn contemplation, a sawmill for grinding labor, and The Hill for life-altering mistakes. The elm tree serves as a permanent landmark of consequence.
              </p>
            </div>

            {/* Comparable Listings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties in Starkfield</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    image: "/assets/comp-mill.png",
                    alt: "The nearby sawmill structure in winter",
                    title: "Corbury Junction Mill",
                    price: "Emotional Cost: Moderate",
                    details: "1 bd | 1 ba | 890 sqft",
                    description: "Transit stop for dreams deferred. Platform for farewells never spoken."
                  },
                  {
                    image: "/assets/comp-church.png",
                    alt: "Starkfield church in the snow",
                    title: "The Minister's House",
                    price: "Emotional Cost: Eternal",
                    details: "2 bd | 1 ba | 1,650 sqft",
                    description: "Overlooks cemetery. Daily reminders of mortality. Excellent for contemplating paths not taken."
                  },
                  {
                    image: "/assets/comp-shadow.png",
                    alt: "Another view of the farmhouse in shadows",
                    title: "The Hale Homestead",
                    price: "Emotional Cost: Severe",
                    details: "4 bd | 2 ba | 2,400 sqft",
                    description: "Multiple rooms for multiple resentments. Extra space for storing grudges."
                  },
                  {
                    image: "/assets/extra-photo.png",
                    alt: "Additional property view showing the stark winter landscape",
                    title: "The Varnum Place",
                    price: "Emotional Cost: High",
                    details: "3 bd | 1 ba | 2,100 sqft",
                    description: "Witness to tragedy. Close proximity to regret. Original moral framework intact."
                  }
                ].map((property, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <Image
                      src={property.image}
                      alt={property.alt}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{property.title}</h3>
                      <p className="text-red-600 font-semibold mb-2">{property.price}</p>
                      <p className="text-sm text-gray-900 mb-2">{property.details}</p>
                      <p className="text-sm text-gray-900">{property.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Contact Agent</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">E. Wharton</p>
                    <p className="text-sm text-gray-900">Realist Agent</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    openDialog("Contact E. Wharton", [
                      "Email: ewharton@starkfieldrealty.edu",
                      '"I have chosen my path, and I shall walk it until the end."',
                    ])
                  }
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
                >
                  Request Info
                </button>
                <button
                  onClick={() =>
                    openDialog("Schedule a Viewing", [
                      "Available times:",
                      "• Mondays at dawn (before hope fades)",
                      "• Wednesdays at dusk (when shadows lengthen)",
                      "• Fridays in the perpetual gloom",
                      "Please bring your own source of warmth.",
                    ])
                  }
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Schedule Viewing
                </button>
                <p className="text-xs text-gray-900 mt-3 text-center">
                  Available for showings during brief moments of hope
                </p>
              </div>

              {/* Mortgage Calculator */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Est. Monthly Payment</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">Your dignity</p>
                <p className="text-sm text-gray-900 mb-4">Plus accumulated regrets</p>
                <button
                  onClick={() =>
                    openDialog("Payment Breakdown", [
                      "Principal: Your dreams ($0)",
                      "Interest: Compounding despair (infinite)",
                      "Insurance: Against hope (futile)",
                      "Taxes: On your soul (annual)",
                      "Monthly Total: Your dignity + all accumulated regrets",
                      "*Rates subject to change based on winter severity.",
                    ])
                  }
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View payment breakdown
                </button>
              </div>

              {/* Print Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Share This Listing</h3>
                <Link href="/print">
                  <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9V2H18V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 14H6V22H18V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Print Listing Flyer
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-sm">
              built by Hao Lin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
