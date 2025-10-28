import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Package, Clock, DollarSign, User, Phone, ChevronDown, ChevronUp, X, Check } from 'lucide-react';

// Simulated Firebase hook (replace with actual implementation)
const useDeliveries = (userId) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Firebase listener
    setTimeout(() => {
      setDeliveries([
        {
          id: 'DEL001',
          status: 'In Transit',
          pickup: { address: 'Kampala Central Market' },
          dropoff: { address: 'Entebbe Road, Kitooro' },
          package: { description: '2 boxes of electronics', weight: 15 },
          recipient: { name: 'John Doe', phone: '+256 700 000 000' },
          fareDetails: { totalFare: 45000 },
          createdAt: { seconds: Date.now() / 1000 - 3600 },
          driverId: 'DRV001',
          driver: { name: 'James Okello', phone: '+256 701 000 000' }
        },
        {
          id: 'DEL002',
          status: 'Pending Driver Assignment',
          pickup: { address: 'Nakawa Market' },
          dropoff: { address: 'Mukono Town' },
          package: { description: 'Fresh vegetables', weight: 25 },
          recipient: { name: 'Mary Nalubega', phone: '+256 702 000 000' },
          fareDetails: { totalFare: 32000 },
          createdAt: { seconds: Date.now() / 1000 - 7200 }
        },
        {
          id: 'DEL003',
          status: 'Delivered',
          pickup: { address: 'Industrial Area' },
          dropoff: { address: 'Jinja Road' },
          package: { description: 'Building materials', weight: 100 },
          recipient: { name: 'Peter Musoke', phone: '+256 703 000 000' },
          fareDetails: { totalFare: 85000 },
          createdAt: { seconds: Date.now() / 1000 - 86400 },
          driverId: 'DRV002',
          driver: { name: 'Sarah Nakato', phone: '+256 704 000 000' }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [userId]);

  return { deliveries, loading };
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Pending Driver Assignment': { color: 'bg-amber-100 text-amber-800 border-amber-300', icon: Clock },
    'Picked Up': { color: 'bg-cyan-100 text-cyan-800 border-cyan-300', icon: Package },
    'In Transit': { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Truck },
    'Delivered': { color: 'bg-green-100 text-green-800 border-green-300', icon: Check },
    'Cancelled': { color: 'bg-red-100 text-red-800 border-red-300', icon: X }
  };

  const config = statusConfig[status] || statusConfig['Pending Driver Assignment'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

// Delivery Card Component
const DeliveryCard = ({ delivery, onTrack, onCancel }) => {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(delivery.createdAt.seconds * 1000).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Booking ID</p>
            <p className="font-mono font-semibold text-gray-900">{delivery.id}</p>
          </div>
          <StatusBadge status={delivery.status} />
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {date}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Route */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              <div className="w-0.5 h-full bg-gray-200 my-1"></div>
            </div>
            <div className="flex-1 pb-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Pickup</p>
              <p className="text-sm font-medium text-gray-900">{delivery.pickup.address}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-100"></div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 mb-1">Drop-off</p>
              <p className="text-sm font-medium text-gray-900">{delivery.dropoff.address}</p>
            </div>
          </div>
        </div>

        {/* Package Info */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Package
            </span>
            <span className="font-medium text-gray-900">{delivery.package.weight} kg</span>
          </div>
          <p className="text-xs text-gray-600">{delivery.package.description}</p>
        </div>

        {/* Expandable Section */}
        {expanded && (
          <div className="space-y-3 pt-3 border-t border-gray-100 animate-in fade-in duration-200">
            {/* Recipient */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Recipient</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{delivery.recipient.name}</span>
                </div>
                <a href={`tel:${delivery.recipient.phone}`} className="text-green-600 hover:text-green-700 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Call</span>
                </a>
              </div>
            </div>

            {/* Driver Info (if assigned) */}
            {delivery.driver && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Assigned Driver</p>
                <div className="flex items-center justify-between text-sm bg-blue-50 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-700">
                        {delivery.driver.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-gray-900 font-medium">{delivery.driver.name}</span>
                  </div>
                  <a href={`tel:${delivery.driver.phone}`} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Call</span>
                  </a>
                </div>
              </div>
            )}

            {/* Fare */}
            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Fare
              </span>
              <span className="font-bold text-lg text-green-600">
                UGX {delivery.fareDetails.totalFare.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="p-5 pt-0 space-y-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Show More <ChevronDown className="w-4 h-4" /></>
          )}
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onTrack(delivery.id)}
            disabled={delivery.status === 'Delivered' || delivery.status === 'Cancelled'}
            className="flex-1 py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Track
          </button>
          
          {delivery.status === 'Pending Driver Assignment' && (
            <button
              onClick={() => onCancel(delivery.id)}
              className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function SenderDashboard() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const userId = 'SENDER001'; // Replace with actual auth
  const { deliveries, loading } = useDeliveries(userId);

  const filteredDeliveries = deliveries
    .filter(d => filter === 'all' || d.status === filter)
    .sort((a, b) => {
      if (sortBy === 'createdAt_desc') return b.createdAt.seconds - a.createdAt.seconds;
      if (sortBy === 'createdAt_asc') return a.createdAt.seconds - b.createdAt.seconds;
      return 0;
    });

  const handleTrack = (id) => {
    alert(`Tracking delivery ${id}`);
  };

  const handleCancel = (id) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert(`Cancelled delivery ${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl h-64 shadow-sm"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-sm text-gray-600 mt-0.5">{deliveries.length} total deliveries</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
              <Package className="w-4 h-4" />
              New Booking
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Statuses</option>
                <option value="Pending Driver Assignment">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="createdAt_desc">Newest First</option>
                <option value="createdAt_asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deliveries Grid */}
        {filteredDeliveries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No deliveries found</h3>
            <p className="text-gray-600 mb-6">Start by creating your first booking</p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              Book a Delivery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDeliveries.map(delivery => (
              <DeliveryCard
                key={delivery.id}
                delivery={delivery}
                onTrack={handleTrack}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
          }
