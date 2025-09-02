'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, School } from 'lucide-react';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  imagePath: string;
}

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample data for development when backend is not available
  const sampleSchools: School[] = [
    {
      id: 1,
      name: "Greenwood Elementary School",
      address: "123 Oak Street",
      city: "Springfield",
      state: "CA",
      contact: "5551234567",
      email_id: "info@greenwood.edu",
      imagePath: "/uploads/school1.jpg"
    },
    {
      id: 2,
      name: "Riverside High School",
      address: "456 River Road",
      city: "Riverside",
      state: "NY",
      contact: "5559876543",
      email_id: "admin@riverside.edu",
      imagePath: "/uploads/school2.jpg"
    },
    {
      id: 3,
      name: "Mountain View Academy",
      address: "789 Hill Avenue",
      city: "Denver",
      state: "CO",
      contact: "5555551234",
      email_id: "contact@mountainview.edu",
      imagePath: "/uploads/school3.jpg"
    },
    {
      id: 4,
      name: "Sunset Middle School",
      address: "321 Sunset Boulevard",
      city: "Los Angeles",
      state: "CA",
      contact: "5554567890",
      email_id: "office@sunset.edu",
      imagePath: "/uploads/school4.jpg"
    },
    {
      id: 5,
      name: "Lakeside Preparatory",
      address: "654 Lake Drive",
      city: "Chicago",
      state: "IL",
      contact: "5553216549",
      email_id: "admissions@lakeside.edu",
      imagePath: "/uploads/school5.jpg"
    },
    {
      id: 6,
      name: "Pine Valley School",
      address: "987 Pine Street",
      city: "Portland",
      state: "OR",
      contact: "5557891234",
      email_id: "info@pinevalley.edu",
      imagePath: "/uploads/school6.jpg"
    }
  ];

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API, fallback to sample data if network error
        try {
          const response = await axios.get('http://localhost:5000/api/schools');
          setSchools(response.data);
        } catch (networkError) {
          console.log('Backend not available, using sample data');
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSchools(sampleSchools);
        }
      } catch (err) {
        setError('Failed to fetch schools. Please try again later.');
        console.error('Error fetching schools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <School className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Schools
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover educational institutions in your area
          </p>
        </div>

        {/* Schools Grid */}
        {schools.length === 0 ? (
          <div className="text-center py-16">
            <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">
              There are currently no schools registered in the system.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school) => (
              <Card
                key={school.id}
                className="group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={school.imagePath.startsWith('/uploads/') 
                      ? `http://localhost:5000${school.imagePath}` 
                      : school.imagePath}
                    alt={school.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {school.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-medium">Address:</span> {school.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">City:</span> {school.city}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {school.state}
                      </span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Active"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Showing {schools.length} school{schools.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}