'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Github, Lock, Shield, CheckCircle2, Zap } from 'lucide-react';

type OnboardingStep = 'auth' | 'role' | 'skills' | 'github' | 'resume' | 'plan';

interface OnboardingState {
  currentStep: OnboardingStep;
  role: string | null;
  skills: Record<string, number>;
  githubPermissions: Record<string, boolean>;
  plan: 'free' | 'pro' | 'architect';
}

const STEP_ORDER: OnboardingStep[] = ['auth', 'role', 'skills', 'github', 'resume', 'plan'];

export default function ForgeaOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 'auth',
    role: null,
    skills: {
      'Backend Engineering': 0,
      'Frontend Engineering': 0,
      'DevOps & Infrastructure': 0,
      'Security': 0,
    },
    githubPermissions: {
      'Read repository metadata': true,
      'Read code': false,
      'Write to repository': false,
      'Access workflow runs': false,
    },
    plan: 'free',
  });

  const [accentColor, setAccentColor] = useState('emerald');
  const [expandedPermission, setExpandedPermission] = useState<string | null>(null);

  // Pulse effect on tap
  const triggerPulse = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const pulse = document.createElement('span');
    pulse.className = 'absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75';
    const rect = target.getBoundingClientRect();
    pulse.style.width = '100%';
    pulse.style.height = '100%';
    target.style.position = 'relative';
    target.appendChild(pulse);
    setTimeout(() => pulse.remove(), 600);
  };

  const nextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(state.currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setState({ ...state, currentStep: STEP_ORDER[currentIndex + 1] });
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setState({ ...state, currentStep: step });
  };

  const handlePlanChange = (plan: 'free' | 'pro' | 'architect') => {
    setState({ ...state, plan });
    const colors = { free: 'emerald', pro: 'yellow', architect: 'violet' };
    setAccentColor(colors[plan]);
  };

  const getAccentClass = (plan: 'free' | 'pro' | 'architect') => {
    switch (plan) {
      case 'pro':
        return 'from-yellow-500 to-yellow-600';
      case 'architect':
        return 'from-violet-500 to-violet-600';
      default:
        return 'from-emerald-500 to-emerald-600';
    }
  };

  // O1: Auth Gateway
  if (state.currentStep === 'auth') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-4">
        <div className="relative w-full max-w-md h-96 flex flex-col">
          {/* Static Forgea Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="text-6xl font-bold text-emerald-500">⚙</div>
          </div>

          {/* Drawer Content */}
          <Drawer open={true}>
            <div className="w-full h-full rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] backdrop-blur-md flex flex-col justify-between p-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold text-white">Forgea</h1>
                <p className="text-sm text-gray-400">Technical Verification Platform</p>
              </div>

              <button
                onClick={(e) => {
                  triggerPulse(e);
                  nextStep();
                }}
                className="relative w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 active:scale-95"
              >
                <div className="flex items-center justify-center gap-2">
                  <Github className="w-5 h-5" />
                  Continue with GitHub
                </div>
              </button>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* O6: Segmented Control Navigation */}
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Tabs
            value={state.currentStep}
            onValueChange={(value) => goToStep(value as OnboardingStep)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 gap-1 bg-[#0a0a0a] border border-[#1f1f1f] p-1 rounded-xl w-full">
              <TabsTrigger
                value="role"
                className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg transition-all"
              >
                Role
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg transition-all"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="github"
                className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg transition-all"
              >
                GitHub
              </TabsTrigger>
              <TabsTrigger
                value="resume"
                className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg transition-all"
              >
                Resume
              </TabsTrigger>
              <TabsTrigger
                value="plan"
                className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg transition-all"
              >
                Plan
              </TabsTrigger>
            </TabsList>

            {/* O2: Role Selection */}
            <TabsContent value="role" className="mt-8">
              <Card className="bg-[#0a0a0a] border-[#1f1f1f] p-0">
                <div className="space-y-1">
                  <div className="p-4 border-b border-[#1f1f1f]">
                    <h2 className="text-lg font-semibold">Select Your Role</h2>
                    <p className="text-sm text-gray-400 mt-1">Choose your primary technical focus</p>
                  </div>

                  <RadioGroup value={state.role || ''} onValueChange={(value) => setState({ ...state, role: value })}>
                    {[
                      { value: 'backend', label: 'Backend Engineer', spec: 'API & Database' },
                      { value: 'frontend', label: 'Frontend Engineer', spec: 'UI & UX' },
                      { value: 'fullstack', label: 'Full Stack Engineer', spec: 'Full Stack' },
                      { value: 'devops', label: 'DevOps Engineer', spec: 'Infrastructure' },
                    ].map((role) => (
                      <div
                        key={role.value}
                        className="flex items-center gap-3 p-4 border-b border-[#1f1f1f] hover:bg-[#0f0f0f] transition-colors cursor-pointer"
                        onClick={() => setState({ ...state, role: role.value })}
                      >
                        <RadioGroupItem value={role.value} className="rounded-full" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{role.label}</p>
                          <p className="text-xs text-gray-500 font-mono">{role.spec}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Card>

              <Button
                onClick={(e) => {
                  triggerPulse(e);
                  nextStep();
                }}
                disabled={!state.role}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-black font-semibold"
              >
                Continue
              </Button>
            </TabsContent>

            {/* O3: Skill Matrix */}
            <TabsContent value="skills" className="mt-8">
              <Card className="bg-[#0a0a0a] border-[#1f1f1f] p-0">
                <div className="p-4 border-b border-[#1f1f1f]">
                  <h2 className="text-lg font-semibold">Proficiency Matrix</h2>
                  <p className="text-sm text-gray-400 mt-1">Rate your skills (0-5)</p>
                </div>

                <div className="p-4 space-y-4">
                  {Object.entries(state.skills).map(([skill, level]) => (
                    <div key={skill}>
                      <p className="text-sm font-medium mb-3">{skill}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setState({
                              ...state,
                              skills: { ...state.skills, [skill]: Math.max(0, level - 1) },
                            })
                          }
                          className="px-3 py-2 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-400 transition-colors"
                        >
                          −
                        </button>

                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <button
                            key={i}
                            onClick={() => setState({ ...state, skills: { ...state.skills, [skill]: i } })}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                              i === level
                                ? 'bg-emerald-500 text-black'
                                : 'bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-400'
                            }`}
                          >
                            {i}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setState({
                              ...state,
                              skills: { ...state.skills, [skill]: Math.min(5, level + 1) },
                            })
                          }
                          className="px-3 py-2 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-400 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Button
                onClick={(e) => {
                  triggerPulse(e);
                  nextStep();
                }}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-black font-semibold"
              >
                Continue
              </Button>
            </TabsContent>

            {/* O4: GitHub Permissions */}
            <TabsContent value="github" className="mt-8">
              <Card className="bg-[#0a0a0a] border-[#1f1f1f] p-0">
                <div className="p-4 border-b border-[#1f1f1f] flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold">GitHub Permissions</h2>
                    <p className="text-sm text-gray-400 mt-1">Configure access levels</p>
                  </div>
                </div>

                <div className="space-y-2 p-4">
                  {Object.entries(state.githubPermissions).map(([permission, granted]) => (
                    <div key={permission}>
                      <div
                        onClick={() =>
                          setExpandedPermission(expandedPermission === permission ? null : permission)
                        }
                        className="flex items-center justify-between p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                      >
                        <label className="text-sm font-medium flex-1 cursor-pointer">{permission}</label>
                        <Switch
                          checked={granted}
                          onCheckedChange={(checked) =>
                            setState({
                              ...state,
                              githubPermissions: { ...state.githubPermissions, [permission]: checked },
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      {expandedPermission === permission && (
                        <div className="mt-2 p-3 rounded-lg bg-[#0f0f0f] border border-[#1f1f1f] text-xs text-gray-400 space-y-1">
                          <p className="font-mono">
                            {permission === 'Read repository metadata' && 'Access to public repository information'}
                          </p>
                          <p className="font-mono">
                            {permission === 'Read code' && 'Analyze source code for verification'}
                          </p>
                          <p className="font-mono">
                            {permission === 'Write to repository' && 'Create commits and pull requests'}
                          </p>
                          <p className="font-mono">
                            {permission === 'Access workflow runs' && 'View CI/CD pipeline status'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Button
                onClick={(e) => {
                  triggerPulse(e);
                  nextStep();
                }}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-black font-semibold"
              >
                Continue
              </Button>
            </TabsContent>

            {/* O7: Resume Mapper */}
            <TabsContent value="resume" className="mt-8">
              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/30 p-6 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500 rounded-full opacity-10" />
                  <div className="absolute bottom-2 -left-4 w-32 h-32 bg-emerald-500 rounded-full opacity-5" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Your Profile</h3>
                        <p className="text-sm text-gray-400 mt-1">Experience Summary</p>
                      </div>
                      <div className="absolute top-0 right-0 bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[
                        { label: 'Experience', value: '5+ yrs' },
                        { label: 'Projects', value: '12' },
                        { label: 'Languages', value: '6' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center p-3 rounded-lg bg-[#1f1f1f]">
                          <p className="text-2xl font-bold text-emerald-500">{stat.value}</p>
                          <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Button
                  onClick={(e) => {
                    triggerPulse(e);
                    nextStep();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-black font-semibold"
                >
                  Continue to Plan
                </Button>
              </div>
            </TabsContent>

            {/* O8: Plan Management */}
            <TabsContent value="plan" className="mt-8">
              <Card className="bg-[#0a0a0a] border-[#1f1f1f] p-0">
                <div className="p-4 border-b border-[#1f1f1f]">
                  <h2 className="text-lg font-semibold">Choose Your Plan</h2>
                  <p className="text-sm text-gray-400 mt-1">Upgrade anytime to unlock more features</p>
                </div>

                <div className="p-4 space-y-3">
                  {[
                    { value: 'free', label: 'Free', color: 'emerald' },
                    { value: 'pro', label: 'Pro', color: 'yellow' },
                    { value: 'architect', label: 'Architect', color: 'violet' },
                  ].map((plan) => (
                    <div
                      key={plan.value}
                      onClick={() => handlePlanChange(plan.value as 'free' | 'pro' | 'architect')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        state.plan === plan.value
                          ? `border-${plan.color}-500 bg-${plan.color}-500/10`
                          : 'border-[#1f1f1f] hover:bg-[#0f0f0f]'
                      }`}
                    >
                      <div>
                        <p className="font-semibold">{plan.label}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {plan.value === 'free' && 'Community verification'}
                          {plan.value === 'pro' && 'Priority assessment'}
                          {plan.value === 'architect' && 'Expert review'}
                        </p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          state.plan === plan.value
                            ? `border-${plan.color}-500 bg-${plan.color}-500`
                            : 'border-gray-600'
                        }`}
                      >
                        {state.plan === plan.value && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Button
                onClick={(e) => {
                  triggerPulse(e);
                }}
                className={`w-full mt-6 text-black font-semibold bg-gradient-to-r ${getAccentClass(
                  state.plan
                )} hover:opacity-90`}
              >
                <Zap className="w-4 h-4 mr-2" />
                Complete Onboarding
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
