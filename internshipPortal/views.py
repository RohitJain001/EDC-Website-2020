from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.utils.decorators import method_decorator
from django.views.generic import DetailView, UpdateView, DeleteView
from .forms import InternshipForm, ApplicationForm, VenCapForm
from .models import Internship, InternshipApplication, VentureCapitalist
import datetime, xlwt
from django.core.paginator import Paginator


def Internships(request, pg=1):
    internship = Internship.objects.all().order_by('-apply_by')
    paginator = Paginator(internship, 8)
    context = {
        'Intern': paginator.page(pg),
        'page': pg,
      	'paginator': paginator,
        'internships': paginator.page(pg)
    }
    return render(request, 'internshipPortal/Internship.html', context)

def MyInternships(request):
    pg = 1
    if(request.user.is_authenticated and request.user.is_startup):
        internships = Internship.objects.filter(startup=request.user.startup_profile).order_by('-apply_by')
        context = {
            'internships': internships,
        }
        return render(request, 'internshipPortal/MyInternshipStartup.html', context)
    elif(request.user.is_authenticated and request.user.is_student):
        internships = InternshipApplication.objects.filter(applied_by=request.user.student_profile)
        context = {
            'internships': internships,
        }
        return render(request, 'internshipPortal/MyInternshipStudent.html', context)
    else:
        redirect(internships, pg=pg)
    
    

def InternshipCreateView(request):
    pg = 1
    form = InternshipForm(request.POST or None)
    if request.user.is_authenticated and request.user.is_startup:
        if form.is_valid():
            form.instance.startup = request.user.startup_profile
            form.save()
            return redirect('internships', pg=pg)
    else:
        messages.success(request, f'You are not authorised to access this page.')
        return redirect('internships', pg=pg)

    context = {
        'form': form
    }
    return render(request, 'internshipPortal/create_internship.html', context)


def InternshipApplicationView(request, pk):
    pg = 1
    internship = Internship.objects.filter(id=pk).first()
    applied_by = InternshipApplication.objects.filter(applied_by=request.user.student_profile)
    date = datetime.date.today()
    for applicant in applied_by:
        if(internship == applicant.internship):
            messages.success(request, f'You have already applied for that internship.')
            return redirect('internship-detail', pk)
    
    if(internship == None or date > internship.apply_by):
        messages.success(request, f'Applications for this internship closed.')
        return redirect('internships', pg = pg)
        

    form = ApplicationForm(request.POST or None)
    
    if form.is_valid():
        form.instance.internship = Internship.objects.filter(id = pk).first()
        form.instance.applied_by = request.user.student_profile
        form.save()
        return redirect('internship-detail', pk)

    context = {
        'form': form
    }
    return render(request, 'internshipPortal/application.html', context)



def InternshipDetailView(request, pk):
    pg = 1
    applied = False

    internship = Internship.objects.filter(id=pk).first()
    if(request.user.is_authenticated and request.user.is_student):
        applied_by = InternshipApplication.objects.filter(applied_by=request.user.student_profile)
        for applicant in applied_by:
            if(internship == applicant.internship):
                applied = True
    
    context = {
        'object' : internship,
        'applied' : applied,
    }

    return render(request, 'internshipPortal/internship_detail.html', context)


def InternshipUpdateView(request, pk):
    pg = 1
    if request.user.is_authenticated and request.user.is_startup and (request.user.startup_profile == Internship.objects.filter(id=pk).first().startup):
        if request.method == 'POST':
            form = InternshipForm(request.POST, instance=Internship.objects.filter(id=pk).first())
            
            if form.is_valid():
                form.save()
                return redirect('internships', pg=pg)

        form = InternshipForm(instance=Internship.objects.filter(id=pk).first())
        context = {
            'form': form
        }
        return render(request, 'internshipPortal/create_internship.html', context)

    else:
        messages.success(request, f'You are not authorised to access this page.')
        return redirect('internships', pg=pg)


def InternshipDeleteView(request, pk): 
    pg = 1
    obj = get_object_or_404(Internship, id=pk)
    internship = Internship.objects.filter(id=pk).first()
    if request.user.is_authenticated and request.user.is_startup and (request.user.startup_profile == obj.startup):
        if request.method =="POST":  
            obj.delete()  
            return redirect('internships', pg=pg)

    else:
        messages.success(request, f'You are not authorised to access this page')
        return redirect('internship-detail', pk)
    
    context ={
        'object' : internship
    }
  
    return render(request, 'internshipPortal/confirm_delete.html', context) 



#########################################################################


def VenCapitalist(request):
    context = {
        'venture': VentureCapitalist.objects.all()
    }
    return render(request, 'internshipPortal/VentureCapitalist.html', context)


def VenCapCreateView(request):
    if request.user.is_authenticated and request.user.is_team:
        if(request.method == 'POST'):
            form = VenCapForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return redirect('venture-capitalist')
        
        else:
            form = VenCapForm()
        
        context = {
        'form': form
        }
        return render(request, 'internshipPortal/create_vencap.html', context)

    else:
        return redirect('venture-capitalist')

def VenCapUpdateView(request, pk):
    if request.user.is_authenticated and request.user.is_team:
        if request.method == 'POST':
            form = VenCapForm(request.POST, request.FILES, instance=VentureCapitalist.objects.filter(id=pk).first())
            
            if form.is_valid():
                form.save()
                return redirect('venture-capitalist')

        form = VenCapForm(instance=VentureCapitalist.objects.filter(id=pk).first())
        context = {
            'form': form
        }
        return render(request, 'internshipPortal/create_vencap.html', context)

    else:
        return redirect('venture-capitalist')

# @method_decorator(user_passes_test(lambda u: u.is_authenticated and u.is_team), name='dispatch')
# class VenCapDeleteView(DeleteView):
#     model = VentureCapitalist
#     success_url = reverse_lazy('venture-capitalist')
#     template_name = 'internshipPortal/confirm_delete.html'


def VenCapDeleteView(request, pk): 
    obj = get_object_or_404(VentureCapitalist, id=pk)
    vencap = VentureCapitalist.objects.filter(id=pk).first()
    if request.user.is_authenticated and request.user.is_team:
        if request.method =="POST":  
            obj.delete()  
            return redirect("venture-capitalist") 
    else:
        messages.success(request, f'You are not authorised to access this page')
        return redirect('venture-capitalist', pk)
    
    context ={
        'object' : vencap
    }
  
    return render(request, 'internshipPortal/confirm_delete.html', context)


#################################################################


def exceldownload(request, pk = None):
    internship = Internship.objects.filter(id=pk).first()
    if request.user.is_authenticated and request.user.is_startup and internship.startup == request.user.startup_profile: 
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="Internship Applications.xls"'

        wb = xlwt.Workbook(encoding='utf-8')
        ws = wb.add_sheet(internship.field_of_internship) # this will make a sheet named Users Data

        row_num = 0

        style = 'font: bold 1; border: top thick, right thick, bottom thick, left thick;'
        font_style = xlwt.easyxf(style)
        columns = ['Message', 'Resume', 'Name', 'College', 'Field of Study', 'CGPA (/10)', 'Year of Study', 'City of Residence', 'Contact No.']

        for col_num in range(len(columns)):
            ws.write(row_num, col_num, columns[col_num], font_style) # at 0 row 0 column 

        styles = [
            'align: wrap 1; border: left thick, right thick;',
            'font: underline 1;',
            'align: horiz center; border: left thick, right thick;',
            'border: left thick, right thick;',
       ]

        rows = InternshipApplication.objects.filter(id=pk).values_list('message', 'resume', 'applied_by__name', 'applied_by__college', 'applied_by__area_of_specialization', 'applied_by__cgpa','applied_by__year_of_study', 'applied_by__city_of_residence', 'applied_by__contact')
        for row in rows:
            row_num += 1
            for col_num in range(len(row)):
                if col_num == 0:
                    font_style = xlwt.easyxf(styles[0])
                elif col_num == 1:
                    font_style = xlwt.easyxf(styles[1])
                elif col_num == 5 or col_num == 6:
                    font_style = xlwt.easyxf(styles[2])
                else:
                    font_style = xlwt.easyxf(styles[3])

                if col_num == 1:
                    ws.write(row_num, col_num, xlwt.Formula('HYPERLINK("%s")'%row[col_num]), font_style)
                else:
                    ws.write(row_num, col_num, row[col_num], font_style)

        font_style = xlwt.easyxf('border: top thick;')
        row_num += 1
        for col_num in range(len(columns)):  
            ws.write(row_num, col_num, "", font_style)

        ws.col(0).width = 256*27
        ws.col(1).width = 256*20
        ws.col(2).width = 256*20
        ws.col(3).width = 256*30
        ws.col(4).width = 256*25
        ws.col(5).width = 256*15
        ws.col(6).width = 256*15
        ws.col(7).width = 256*20
        ws.col(8).width = 256*20

        wb.save(response)

        return response

    else:
        messages.success(request, f'You are not authorised to access this data.')
        return redirect('home')
