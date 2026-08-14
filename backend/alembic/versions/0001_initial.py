"""initial migration

Revision ID: 0001_initial
Revises: 
Create Date: 2026-01-01 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # interviews
    op.create_table(
        'interviews',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('session_id', sa.String(length=64), nullable=False),
        sa.Column('category', sa.String(length=128), nullable=False),
        sa.Column('difficulty', sa.String(length=64), nullable=False),
        sa.Column('number_of_questions', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('completed_at', sa.DateTime(), nullable=True),
    )
    op.create_index(op.f('ix_interviews_session_id'), 'interviews', ['session_id'], unique=False)

    # questions
    op.create_table(
        'questions',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('session_id', sa.String(length=64), nullable=False),
        sa.Column('interview_id', sa.Integer(), sa.ForeignKey('interviews.id', ondelete='CASCADE'), nullable=False),
        sa.Column('question_number', sa.Integer(), nullable=False),
        sa.Column('question_text', sa.Text(), nullable=False),
    )
    op.create_index(op.f('ix_questions_session_id'), 'questions', ['session_id'], unique=False)

    # answers
    op.create_table(
        'answers',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('session_id', sa.String(length=64), nullable=False),
        sa.Column('question_id', sa.Integer(), sa.ForeignKey('questions.id', ondelete='CASCADE'), nullable=False),
        sa.Column('answer_text', sa.Text(), nullable=True),
        sa.Column('score', sa.Integer(), nullable=True),
        sa.Column('accuracy', sa.Integer(), nullable=True),
        sa.Column('technical_knowledge', sa.Integer(), nullable=True),
        sa.Column('clarity', sa.Integer(), nullable=True),
        sa.Column('completeness', sa.Integer(), nullable=True),
        sa.Column('feedback', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
    )
    op.create_index(op.f('ix_answers_session_id'), 'answers', ['session_id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_answers_session_id'), table_name='answers')
    op.drop_table('answers')

    op.drop_index(op.f('ix_questions_session_id'), table_name='questions')
    op.drop_table('questions')

    op.drop_index(op.f('ix_interviews_session_id'), table_name='interviews')
    op.drop_table('interviews')
