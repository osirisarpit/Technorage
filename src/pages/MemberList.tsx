import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { members, verticals, Member } from '@/data/dummyData';
import { MemberCard } from '@/components/cards/MemberCard';
import { MemberProfileDialog } from '@/components/dialogs/MemberProfileDialog';
import { AssignTaskDialog } from '@/components/dialogs/AssignTaskDialog';

const MemberList = () => {
  const [search, setSearch] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignMember, setAssignMember] = useState<Member | null>(null);

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase());
    const matchesVertical = verticalFilter === 'all' || member.vertical === verticalFilter;
    return matchesSearch && matchesVertical;
  });

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setProfileOpen(true);
  };

  const handleAssignTask = (member: Member) => {
    setAssignMember(member);
    setAssignOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Member List
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage your vertical members
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50"
          />
        </div>

        <Select value={verticalFilter} onValueChange={setVerticalFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-secondary/50">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by vertical" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Verticals</SelectItem>
            {verticals.map((vertical) => (
              <SelectItem key={vertical} value={vertical}>
                {vertical}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{filteredMembers.length} members found</span>
        {verticalFilter !== 'all' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVerticalFilter('all')}
            className="h-auto py-1 px-2"
          >
            Clear filter
          </Button>
        )}
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-scale-in"
          >
            <MemberCard
              member={member}
              onClick={handleMemberClick}
              onAssignTask={handleAssignTask}
            />
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No members found matching your criteria.
        </div>
      )}

      <MemberProfileDialog
        member={selectedMember}
        open={profileOpen}
        onOpenChange={setProfileOpen}
        onAssignTask={handleAssignTask}
      />

      <AssignTaskDialog
        member={assignMember}
        open={assignOpen}
        onOpenChange={setAssignOpen}
      />
    </div>
  );
};

export default MemberList;
