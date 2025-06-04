import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Users, Calendar, TrendingUp } from "lucide-react";
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LeadData {
  _id: string; // MongoDB ID
  name: string;
  email: string;
  source: string;
  productInterest: string;
  createdAt: string; // Use createdAt from API
}

const Admin = () => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    topSource: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(process.env.BACKEND_API_URL || 'http://localhost:5050' + '/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('adminToken');
        navigate('/login');
        return;
      }

      const data = await response.json();
      setLeads(data);

      // Calculate stats
      const today = new Date().toDateString();
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const todayLeads = data.filter((lead: LeadData) =>
        new Date(lead.createdAt).toDateString() === today
      );

      const weekLeads = data.filter((lead: LeadData) =>
        new Date(lead.createdAt) >= oneWeekAgo
      );

      // Find most popular source
      const sourceCounts = data.reduce((acc: any, lead: LeadData) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
      }, {});

      const topSource = Object.keys(sourceCounts).reduce((a, b) =>
        sourceCounts[a] > sourceCounts[b] ? a : b, ''
      );

      setStats({
        total: data.length,
        today: todayLeads.length,
        thisWeek: weekLeads.length,
        topSource: topSource || 'No data',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = () => {
    if (leads.length === 0) {
      alert('No leads to export');
      return;
    }

    const exportData = leads.map(lead => ({
      'Name': lead.name,
      'Email': lead.email,
      'Source': lead.source,
      'Product Interest': lead.productInterest,
      'Date': lead.createdAt,
      'Timestamp': new Date(lead.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    
    XLSX.writeFile(workbook, `wellness-leads-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const clearAllLeads = async () => {
    if (window.confirm('Are you sure you want to clear all leads? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/login');
          return;
        }

          const response = await fetch(process.env.BACKEND_API_URL||'http://localhost:5050'+ '/api/leads', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to clear leads');
        }
        setLeads([]);
        setStats({ total: 0, today: 0, thisWeek: 0, topSource: 'No data' });
        toast({
          title: "Success",
          description: "All leads have been cleared",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to clear leads",
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-sage-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sage-900 mb-2">Lead Management Dashboard</h1>
          <p className="text-sage-600">Monitor and export your wellness community leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm text-sage-600">Total Leads</p>
                <p className="text-2xl font-bold text-sage-900">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm text-sage-600">Today</p>
                <p className="text-2xl font-bold text-sage-900">{stats.today}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm text-sage-600">This Week</p>
                <p className="text-2xl font-bold text-sage-900">{stats.thisWeek}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div>
              <p className="text-sm text-sage-600">Top Source</p>
              <p className="text-lg font-semibold text-sage-900 capitalize">
                {stats.topSource.replace('-', ' ')}
              </p>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={exportToExcel}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={leads.length === 0}
          >
            <Download className="mr-2 w-4 h-4" />
            Export to Excel
          </Button>
          
          <Button 
            onClick={clearAllLeads}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
            disabled={leads.length === 0}
          >
            Clear All Leads
          </Button>
        </div>

        {/* Leads Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-sage-200">
            <h2 className="text-xl font-semibold text-sage-900">Recent Leads</h2>
          </div>
          
          {leads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-sage-300 mx-auto mb-4" />
              <p className="text-sage-600">No leads collected yet. Start driving traffic to your landing page!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sage-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-sage-200">
                  {leads.slice().reverse().map((lead) => (
                    <tr key={lead._id} className="hover:bg-sage-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600 capitalize">
                        {lead.source.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600 capitalize">
                        {lead.productInterest.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Admin;
